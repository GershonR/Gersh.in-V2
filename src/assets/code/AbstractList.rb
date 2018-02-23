#-----------------------------------------
# Generic list class with function in Ruby
#
#-----------------------------------------
module AbstractList
  
  class Node
    
    # Initialize nodes
    # Nodes require either 1 or 2 arguements
    # The first arguement is the data to store
    # The second arguement is the next node to link
    def initialize(*args)
      if args.size>2 or args.size<1
         raise "initializer needs 1 or 2 arguments"
      else 
        if args.size == 1
          @data = args[0]
        else
          @data = args[0]
          @nextNode = args[1]
        end
      end
    end
    
    def getNext
      return @nextNode
    end
    
    def setNext(item)
      @nextNode = item
    end
    
    def getData
      return @data
    end
    
    def to_s
      puts @data
    end
  end
  
  class AbstractList
    @top = nil
    @back = nil
    
    
    # Do not allow AbstractList initializing
    # By overwriting the new method
    def AbstractList.new(*args)
      if (self == AbstractList)
        raise "AbstractList is an abstract class and cannot be instantiated"
       else
          super
        end
      end
    
    def empty?
      return @top == nil
    end
    
    
    # Insert Node in front of list
    # #{@item} - The node to insert
    def insertFront(item)
      if item == nil
        return
      end
      if @top == nil
        @top = item
        @back = item
      else
        item.setNext(@top)
        @top = item
      end
    end
    
    # Insert Node in back of list
    # #{@item} - The node to insert
    def insertBack(item)
      if item == nil
        return
      else
        item.setNext(nil)
        if @top == nil
          @top = item
          @back = item
        else
          @back.setNext(item)
          @back = item
        end
      end
    end
    
    
    # Remove the first node in the list and return its data
    def removeFirst
      toReturn = nil
      if @top == nil
        return toReturn
      else
        toReturn = @top
        if @top == @back
          @top = nil
          @back = nil
        else
          @top = @top.getNext()
        end
      end
      return toReturn
    end
    
    def getTop
      return @top
    end
    
  end
  
  class MyQueue < AbstractList
    
    def initialize
      super()
     end
    
     
    # Insert data in back of list (enqueue)
    # #{@item} - The data to insert
    # Uses the inherited AbstractList methods
    def push(item)
      node = Node.new(item, nil)
      insertBack(node)
    end
    
    
    # Get data in front of list (dequeue)
    # Uses the inherited AbstractList methods
    def pop()
      node = removeFirst()
      toReturn = nil
      if(node != nil)
        toReturn = node.getData()
      end
      return toReturn
    end
  end
  
class MyStack < AbstractList
    
    def initialize
      super()
     end
    
     # Insert data in front of list (push)
     # #{@item} - The data to insert
     # Uses the inherited AbstractList methods
    def push(item)
      node = Node.new(item, nil)
      insertFront(node)
    end
    
    # Get data in front of list (pop)
    # Uses the inherited AbstractList methods
    def pop()
      node = removeFirst()
      toReturn = nil
      if(node != nil)
        toReturn = node.getData()
      end
      return toReturn
    end
  end  
end