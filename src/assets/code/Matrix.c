// Gershon Reydman
// www.gersh.in

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define MATRIXONE_ROWS (sizeof MATRIXONE / sizeof MATRIXONE[0])
#define MATRIXONE_COLUMNS (sizeof MATRIXONE[0] / sizeof MATRIXONE[0][0])

#define MATRIXTWO_ROWS (sizeof MATRIXTWO / sizeof MATRIXTWO[0])
#define MATRIXTWO_COLUMNS (sizeof MATRIXTWO[0] / sizeof MATRIXTWO[0][0])

void printResult(void);
int canMultiply(void);

int MATRIXONE [4][5]= {
    {1, 2, 3, 4 , 5},
    {6, 7, 8, 9, 10},
    {11, 12, 13, 14, 15},
    {16, 17, 18, 19, 20}
};

int MATRIXTWO [5][2] = {
    {1, 2},
    {3, 4},
    {5, 6},
    {7, 8},
    {9, 10}
};


int RESULT [MATRIXONE_ROWS][MATRIXTWO_COLUMNS];

int threadCount = MATRIXONE_ROWS * MATRIXTWO_COLUMNS;

void* thread_function(void * arg) {
    int row = (int)arg / MATRIXTWO_COLUMNS;
    int col = (int)arg % MATRIXTWO_COLUMNS;
    int sum = 0;
    for (int k = 0; k < MATRIXTWO_ROWS; k++)
        sum += (MATRIXONE[row][k] * MATRIXTWO[k][col]);
    RESULT[row][col] = sum;
    return 0;
}


int main(void) {
	if(canMultiply() == 0) {
		puts("ERROR Cannot multiply these matrices");
		return EXIT_FAILURE;
	}
	pthread_t thread_id[threadCount];
    int i;
    for(i=0;i<threadCount;i++) {
        pthread_create (&thread_id[i], NULL , &thread_function, (void *)i);
    }

    for(i=0;i<threadCount;i++) {
        pthread_join(thread_id[i], NULL);
    }

    printResult();
    pthread_exit(NULL);
	return EXIT_SUCCESS;
}

void printResult(void) {
	for(int i = 0; i < MATRIXONE_ROWS; i++) {
		for(int j = 0; j < MATRIXTWO_COLUMNS; j++) {
			printf("%d ", RESULT[i][j]);
		}
		puts("\n");
	}
}

int canMultiply(void) {
	if(MATRIXONE_COLUMNS == MATRIXTWO_ROWS)
		return 1;
	else
		return 0;
}
