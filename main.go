package main

import (
	"log"
	"net/http"
)

func main() {
	// We wrap the file server with a handler that checks for the root path.
	fs := http.FileServer(http.Dir("./"))
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Received request for path: %s", r.URL.Path)
		// If the request is for the root path, redirect to the start.html page
		if r.URL.Path == "/" {
			log.Println("Path is '/', redirecting to /start.html")
			http.Redirect(w, r, "/start.html", http.StatusSeeOther)
			return
		}
		// For all other requests, fall back to the file server.
		log.Printf("Path is not '/', falling back to file server for: %s", r.URL.Path)
		fs.ServeHTTP(w, r)
	}))

	log.Println("Listening on http://localhost:6060...")
	err := http.ListenAndServe(":6060", nil)
	if err != nil {
		log.Fatal(err)
	}
}
