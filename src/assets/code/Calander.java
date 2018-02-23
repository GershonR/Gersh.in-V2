 /* PURPOSE: 
 * Generate calanders for October and September with important dates.
 * Generate a list of events for each month, including time for each event and priority.
 * Generate a list of high priority events. (Priority 3)
 * 
 */

public class Calander {
	
	public static Event[] September = new Event[30];
	public static Event[] October = new Event[31];
	public static int FIRST_DAY_SEPTEMBER = (int)(Math.random() * 6) + 0;
	public static int FIRST_DAY_OCTOBER = (FIRST_DAY_SEPTEMBER + 30) % 7;
	private static String[] daysOfWeek = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
	public static String[] events = {"Sleep", "Game", "Eat", "Run"}; // Modify, Add, Remove events
	public static String[] eventsTime = {"11:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"}; // Modify, Add, Remove event times
	
	
	public static void main(String[] args) {
		September = randomEvents(September, 10);
		October = randomEvents(October, 10);
		System.out.println("SEPTEMBER:");
		printView1(September); // Calender View
		printView2(September); // Events View
		printView3(September); // High Priority Events
		System.out.println("\nOCTOBER:");
		printView1(October); // Calender View
		printView2(October); // Events View
		printView3(October); // High Priority Events
		System.out.println("\nTHE PROGRAM HAS FINISHED RUNNING.");
	}

	public static Event[] randomEvents(Event[] month, int num) {
		int loops = 0;
		while(loops < num) { // Generate (num) number of events
			int eventSpot = (int)(Math.random() * events.length); // Chooses a random spot in events array and eventstiem array
			int day = (int)(Math.random() * num) + 1; // Generate random day for the event
			int priority = (int)(Math.random() * 3) + 1; // Generate a random priority
			String event = events[eventSpot];
			String eventTime = eventsTime[eventSpot];
			month[day] = new Event(eventTime, event, priority); // Creates a new event on that day
			loops++;
		}
		return month;
		
	}
	
	public static void printView1(Event[] month) {
		int firstDay = (month == October) ? FIRST_DAY_OCTOBER : FIRST_DAY_SEPTEMBER; // Which day are we starting on (Sun-Sat)
		int day = 1;
		int dayOfWeek = 0;
		System.out.print("\n");
		for(String d : daysOfWeek) // Print out the days of the week
			System.out.print("\t" + d);
		System.out.print("\n");
		while(!daysOfWeek[dayOfWeek].equals(daysOfWeek[firstDay])) { // Use the tab key until we reach the first day
			System.out.print("\t");
			dayOfWeek++;
		}
		for(Event x : month) {
			if(dayOfWeek >= 7) { // We went past Saturday, go back to Sunday
				System.out.println("\n");
				dayOfWeek = 0;
			}
			if(x != null) // Event on this day
				System.out.print("\t" + day +"*");
			else // No event
				System.out.print("\t" + day);
			day++;
			dayOfWeek++;

		}
	}
	
	public static void printView2(Event[] month) {
		System.out.println("\n\n\tEvents:");
		int day = 1;
		for(Event x : month) {
			if(x != null) // There's an event
				System.out.println("\n\t" + day + ":" + x.toString());
			day++;
		}
	}
	
	public static void printView3(Event[] month) {
		System.out.println("\n\tHigh-priority events:");
		int day = 1;
		for(Event x : month) {
			if(x != null && x.getPriority() == 3) // There's an event with priority 3
				System.out.println("\n\t" + day + ":" + x.getName());
			day++;
		}
	}

}

class Event {
	
	private String time;
	private String name;
	private int priority;
	
	public Event(String time,String name, int priority) {
		this.time = time;
		this.name = name;
		this.priority = priority;
	}
	
	public String toString() {
		return " " + time + ": Event: " + name + " (priority " + priority + ")";
	}
	
	public int getPriority() {
		return priority;
	}
	
	public String getName() {
		return " Event: " + name;
	}
	
}
