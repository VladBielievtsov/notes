package main

import "github.com/VladBielievtsov/notes/app"

func main() {
	err := app.Start()
	if err != nil {
		panic(err)
	}
}
