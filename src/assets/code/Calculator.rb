#-----------------------------------------
# REMARKS: This program takes in input to calculate a number, numbers input must be 0-9
# Valid operators: +,-,*,/,%,(,)
#
#-----------------------------------------

class Calculator
  require "AbstractList"
  include AbstractList
  
  
  # Given a string return a queue of the string in postfix form
  # #{infix} - The string to convert
  def self.convertToPostfix(infix)
    postfix = MyQueue.new()
    opStack = MyStack.new()
    infix.each_char do |i|
      s = i.to_str
      if(s == " " || s == "\n")
        s = ""
      elsif (s !~ /\D/)
        postfix.push(s)
      elsif(s == "(")
        opStack.push(s)
      elsif(s == ")")
        while(opStack.getTop().getData() != "(")
          postfix.push(opStack.pop())
        end
        opStack.pop
      else
        while(!opStack.empty? && (priority(s).to_i <= priority(opStack.getTop.getData).to_i))
          postfix.push(opStack.pop())
        end
        opStack.push(s)
      end
    end
    while(!opStack.empty?)
        postfix.push(opStack.pop())
    end
    return postfix
   end
   
   # Given a string return the priority it maps to
   # #{s} - The string to check
   def self.priority(s)
     priority = 0
     if(s == "*" || s == "/" || s == "%")
       priority = 2
     elsif (s == "+" || s == "-")
       priority = 1
     return priority
     end
     
   end
   
   
   # Given a queue in postfix form, evaluate it and return the result
   # #{postfix} - The queue to evaluate
   def self.evaluate(postfix)
     evalStack = MyStack.new()
     while(!postfix.empty?)
       op = postfix.pop()
       if (op !~ /\D/)
         evalStack.push(op.to_i)
       else
         right = evalStack.pop()
         left = evalStack.pop()
         if(op == "/" || op == "%")
           if (right == 0)
             raise("Tried to divide by zero ya dingus!")
           end
         else
           result = left.send(op, right)
           evalStack.push(result)
         end
       end
   end
   return evalStack.getTop.getData
   end
  line=$stdin.readline.gsub("\n","")    #gsub just removed the \n char when submitting a line into console and pressing enter
  x = convertToPostfix(line)            #can remove gsub and will still work, but this is just to make the print look nice
  y = evaluate(x)
  puts "#{line} = #{y}"
  
end