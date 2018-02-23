/**
 * PURPOSE: Generate 5 random lottery numbers, and compare them to the 5 lottery numbers the user has input.
 */

public class Lottery {
	
	public static int[] userNumbers = new int[5];

	public static void main(String[] args) {
		int x = 0; // Current amount of valid numbers - range from [0,10)
		int num = 0; // Current number the user entered
		System.out.print("Enter 5 lottery numbers ");
		Scanner scan = new Scanner(System.in);
		while (x < 5) {
			num = scan.nextInt();
			if(num < 10 && num >= 0) {
				userNumbers[x] = num; // Input into array
				x++;
			}
		}
		scan.close();
		print(); 
		System.out.println("\nThe program has finished running.");

	}
	
	public static void print() {
		Lottery lot = new Lottery(); // Create a lottery object
		System.out.print("Lottery numbers:\t");
		for(int x : lot.getNumbers())
			System.out.print(x + " ");
		System.out.print("\nUser numbers: \t\t");
		for(int d : userNumbers)
			System.out.print(d + " ");
		System.out.println("\nNumbers matched: " + lot.checkNumbers(userNumbers));
		if(lot.checkNumbers(userNumbers) >= 5)
			System.out.println("You are a grand prize winner!");
	}

}

class Lottery {
	public int[] lotteryNumbers = new int[5];
	
	public Lottery() {
		for(int x = 0; x < lotteryNumbers.length; x++) {
			lotteryNumbers[x] = (int)(Math.random() * 10); // Place random numbers in lotteryNumbers array
		}
	}
	
	/**
	 * Takes an array of numbers and checks it,
	 * Against the randomly generated lotteryNumbers array.
	 * 
	 * @param numbers The array to check
	 * @return Amount of digits matching at spot x
	 */
	public int checkNumbers(int[] numbers) {
		int digitsMatched = 0;
		for(int x = 0; x < lotteryNumbers.length; x++) {
			if(numbers[x] == lotteryNumbers[x]) {
				digitsMatched++;
			}
		}
		return digitsMatched;
	}
	
	/**
	 * Returns the lotteryNumbers array
	 * 
	 * @return lotteryNumbers
	 */
	public int[] getNumbers() {
		return lotteryNumbers;
	}
}