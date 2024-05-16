package funcs

import (
	"fmt"
)

// simple error handeling in seperate function to make the code look nicer
func CatchError(err error) {
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
}
