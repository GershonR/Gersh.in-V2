;This code implements a print routine that prints a number passed to it.
;The number can be negative, positive or zero.
;It relies on two routines: modulo and divide, which you are implementing as part of this assignment
;See the comments for the modulo and divide routines on how the arguments are passed to them.
;------------------------------------------------------------------------------------------
;Test Harness

  .orig x3000

  LD R6,STACKBASE     ;set up stack 

  LD R0,test          ;put test data into R0
  
  ADD R6,R6,#-1       ;put test data onto stacks
  STR R0,R6,#0

  jsr Print           ;print the content of register R0 (the argument)

  ADD R6,R6,#1        ;remove arg.
  
  halt

;----------------------------------------------
;Subroutine Push - pushes the argument onto the stack
;
;Stack Frame:
;R5+1 - Parameter 1 (A) - The Argument

Push
    ADD R6,R6,#-1  ;push R0
    STR R0,R6,#0
    AND R0,R0,#0
    RET

;---------------------------------------------------  
;Subroutine Pop - gets the argument from the stack and returns it
;Stack Frame:
;R5+0 - return value (will hold the value of the top of the stack)
;R5+1 - Parameter 1 (A)

Pop
  LDR R0,R6,#0      ;restore R0
  ADD R6,R6,#1
  RET

;----------------------------------------------
;Subroutine Modulo - finds the remainder when dividing a non-negative number by a positive number
;
;implemented as A % B = A - (A/B) * B

;Stack Frame:
;R5+0 - return value (will hold the value of A % B) 
;R5+1 - Parameter 2 (B)
;R5+2 - Parameter 1 (A)

Modulo
  ADD R6,R6,#-1     ;save R5, important since this routine may be called from another routine.
  STR R5,R6,#0
  
  ADD R5,R6,#1      ;make R5 point to return value 

  ADD R6,R6,#-1     ;save R0 (since we will be using it)
  STR R0,R6,#0

  ADD R6,R6,#-1     ;save R1 (since we will be using it)
  STR R1,R6,#0

  ADD R6,R6,#-1     ;save R2 (since we will be using it)
  ;STR R2,R6,#0

  ADD R6,R6,#-1     ;save R3 (since we will be using it)
  STR R3,R6,#0

  ADD R6,R6,#-1     ;save R4 (since we will be using it)
  STR R4,R6,#0


  ADD R6,R6,#-1     ;save R7 (to return back)
  STR R7,R6,#0

  AND R3,R3,#0
  
  ;do Modulo
  LDR R2,R5,#2      ;load A into R2
  LDR R1,R5,#1      ;load B into R1
  ;(A/B)
  ADD R0,R2,#0   
  JSR Push          ;push R1 onto stack
  AND R0,R0,#0      ;set R0 to 10
  ADD R0,R0,R1
  JSR Push          ;push #10 onto stack
  ADD R6,R6,#-1     ;set space for return value

  JSR Divide        ;divide number by 10

  JSR Pop
  ADD R3,R0,#0      ;R1 is now old R1 divide by 10
  ADD R6,R6,#2      ;remove args from stack

  ;((A/B)*B)
  AND R4,R4,#0
  MULTIPLI
      ADD R4, R4, R3
      ADD R1, R1, #-1
      BRp MULTIPLI

  ;R4 is now ((A/B)*B)
  ;DO (A-(A/B)*B)
  LDR R2,R5,#2      ;load A into R1
  NOT R4,R4	    ;2's comp of R4
  ADD R4,R4, #1
  ADD R2, R2, R4    ;A-((A/B)*B)

  STR R2,R5,#0      ;put result onto stack

  LDR R7,R6,#0      ;restore R7
  ADD R6,R6,#1

  LDR R4,R6,#0      ;restore R4
  ADD R6,R6,#1

  LDR R3,R6,#0      ;restore R3
  ADD R6,R6,#1


  LDR R2,R6,#0      ;restore R2
  ADD R6,R6,#1

  LDR R1,R6,#0      ;restore R1
  ADD R6,R6,#1

  LDR R0,R6,#0      ;restore R0
  ADD R6,R6,#1

  LDR R5,R6,#0      ;restore R5
  ADD R6,R6,#1
  RET               ;return from subroutine


;---------------------------------------------------  
;Subroutine Divide - Divides a non-negative number by a positive number
;Stack Frame:
;R5+0 - return value (will hold the value of paramter 1 / parameter 2)
;R5+1 - Parameter 2 (The divisor) B
;R5+2 - Parameter 1 (The Dividend)  A 

Divide
  ADD R6,R6,#-1     ;save R5, important since this routine may be called from another routine.
  STR R5,R6,#0

  ADD R5,R6,#1    ;make R5 point to return value 

  ADD R6,R6,#-1     ;save R0 (since we will be using it)
  STR R0,R6,#0

  ADD R6,R6,#-1     ;save R1 (since we will be using it)
  STR R1,R6,#0

  ADD R6,R6,#-1     ;save R2 (since we will be using it)
  STR R2,R6,#0

  ;do Division
  
  LDR R2,R5,#2      ;load A into R2
  LDR R1,R5,#1      ;load B into R1

  NOT R1, R1   ; 2's compliment of B
  ADD R1, R1, #1

  AND R0, R0, #0    ;Clear R0 -> D
  LOOP
	ADD R2, R2, R1
	BRn ENDLOOP     ;A < B
  ADDNUM
	ADD R0, R0, #1
	BR LOOP
  ENDLOOP
  STR R0,R5,#0      ;put result onto stack
  LDR R2,R6,#0      ;restore R2
  ADD R6,R6,#1

  LDR R1,R6,#0      ;restore R1
  ADD R6,R6,#1

  LDR R0,R6,#0      ;restore R0
  ADD R6,R6,#1

  LDR R5,R6,#0      ;restore R5
  ADD R6,R6,#1
  RET  

;End of Subroutine DIVIDE

;---------------------------------------------------  
;Subroutine Print - Prints the argument on the stack onto the console. Will print both postive and negative numbers and zero.

;Data Dictionary
;R0 -  Used for printing (should point to start of string before printing), and scratch register
;R5 - Frame pointer
;R6 - Stack Pointer
;R1 - parameter (which I call n)
;R2 - pointer to the local string allocated on the stack
;R3 - copy of the parameter value 
;R4 - holds result of division
;R7 - return address to caller

;Stack Frame:
;R5-13 - Start of string for holding number to be printed. 
;R5-6 - Saved R7
;R5-5 - Saved R4
;R5-4 - Saved R3
;R5-3 - Saved R2
;R5-2 - Saved R1
;R5-1 - Saved R5
;R5+0 - Number to be printed (which I'll call n)

  
Print
  ADD R0,R7,#0
  JSR Push          ;save R7 (since we will be using it)
  
  ADD R0,R5,#0     ;save R5, important since this routine may be called from another routine.
  JSR Push
  
  ADD R5,R6,#2      ;make R5 point to return value 

  ADD R0,R1,#0      ;save R1 (since we will be using it)
  JSR Push

  ADD R0,R2,#0
  JSR Push          ;save R2 (since we will be using it)

  ADD R0,R3,#0
  JSR Push          ;save R3 (since we will be using it)

  ADD R0,R4,#0
  JSR Push          ;save R4 (since we will be using it)


  ADD R6,R6,#-7     ;set aside 7 bytes on stack for string (number is at most 5 digits, optional -, and must have a null terminator)
  
  ADD R2,R5,#-8     ;point to end of allocated space for string
  AND R0,R0,#0      ;put #0 into R0
  STR R0,R2,#0      ;put ascii code 0 into end of string memory
  
    
  LDR R1,R5,#0      ;get arg (at R5+0)
  ADD R3,R1,#0      ;make a copy of the parameter
  ;need to determine if number is negative or not
  
  BRzp PosPrint
  
  NOT R1,R1         ;negate the negative 
  ADD R1,R1,#1      ;to get a positive number
                    ;will put in - sign at the end
PosPrint
  ADD R2,R2,#-1     ;R2 points to the spot in string to place next digit  

  ;We will use standard div/mod by 10 to extract the digits of n. 
  ;Also the string needs to be built backwards, starting list the least significant digit.
  ;For example, in the number 123, we need to get the 3 first, 2 second and the 1 last.

  ADD R0,R1,#0   
  JSR Push          ;push R1 onto stack
  AND R0,R0,#0      ;set R0 to 10
  ADD R0,R0,#10
  JSR Push          ;push #10 onto stack
  ADD R6,R6,#-1     ;set space for return value

  JSR Divide        ;divide number by 10

  JSR Pop
  ADD R1,R0,#0      ;R1 is now old R1 divide by 10

; no need to remove the arguments, we're using them again anyway
;  ADD R6,R6,#2      ;remove args from stack

  ADD R6,R6,#-1     ;set space for return value
  
  JSR Modulo        ;number mod 10

  JSR Pop           ;R0 contains the last digit of number

  ADD R6,R6,#2      ;remove args from stack
  
  LD R4,ASCII_ZERO
  ADD R0,R0,R4      ;R0 contains ASCII code for the digit
  STR R0,R2,#0      ;store the digit (ASCII Code) into the string

  ADD R1,R1,#0      ;test value of number n.
  BRp PosPrint      ;continue if it is positive

DonePrint

  ;deal with - sign if necessary 

  ADD R3,R3,#0      ;look at n (recall R3 contains it)
  BRzp NoMinus      ;see if it is non-negative, if so, do nothing
  
  ADD R2,R2,#-1     ;otherwise, add a '-' to the string.
  LD R0,ASCII_MINUS_SIGN
  STR R0,R2,#0
NoMinus
  ;Now print the string

  ADD R0,R2,#0      ;R0 now contains the 
  trap x22          ;print string.

  ADD R6,R6,#7      ;remove space for string on stack

  ;restore stack before returning

  JSR Pop
  ADD R4,R0,#0  ;retore R4

  JSR Pop
  ADD R3,R0,#0  ;retore R3

  JSR Pop       ;retore R2
  ADD R2,R0,#0

  JSR Pop
  ADD R1,R0,#0  ;retore R1

  JSR Pop       ;retore R5
  ADD R5,R0,#0

  JSR Pop
  ADD R7,R0,#0  ;retore R7

  RET 

  
ASCII_MINUS_SIGN  .fill #45   ;ASCII CODE for '-'
ASCII_ZERO        .fill #48   ;ASCII CODE for '0'
STACKBASE         .fill x5000
test              .fill #500
  .end