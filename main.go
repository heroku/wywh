package main

import (
	"net/http"
	"os"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("/app/public")))
	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
}
