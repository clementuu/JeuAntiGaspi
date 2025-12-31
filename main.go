package main

import (
	"log"
	"net/http"
)

func main() {
	// We wrap the file server with a handler that checks for the root path.
	fs := http.FileServer(http.Dir("./"))
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fs.ServeHTTP(w, r)
	}))

	log.Println("Listening on http://localhost:6060...")
	err := http.ListenAndServe(":6060", nil)
	if err != nil {
		log.Fatal(err)
	}
}
