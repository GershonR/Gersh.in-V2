; This example program constantly checks the keyboard status register (KSR)
; to see if it contains input, once a user enters a character, it will print out
; the next ASCII character after it.

.ORIG   x3000

INPUT   LDI R2, KSR    ; Read Keyboard status register into R2
        BRzp INPUT     ; If not ready, keep asking
        LDI R0, KDR    ; Take in the input and put into R0
        
OUTPUT   LDI R2, DSR    ; Read Display status register into R2
        BRzp OUTPUT     ; If not ready, keep asking
        ADD R0,R0,#1   ; print the next ASCII CHAR
        STI R0, DDR    ; Take in the output and put into R0 to display
        
        BR INPUT     ; go back to asking for input

        HALT
KSR     .FILL   xFE00   ; Keyboard status register location
KDR     .FILL   xFE02   ; Keyboard data register location
DSR     .FILL   xFE04   ; Display status register location
DDR     .FILL   xFE06   ; Display data register location
        .END