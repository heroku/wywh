package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func assetDir() (string, error) {
	d, err := os.Getwd()
	if err != nil {
		return d, err
	}
	return filepath.Join(d, "public"), nil
}

func main() {
	a, err := assetDir()
	if err != nil {
		log.Fatal("Unable to determine asset directory:", err)
	}

	p, e := os.LookupEnv("PORT")
	if !e {
		p = "5000" // Default port
	}

	http.Handle("/", http.FileServer(http.Dir(a)))
	log.Println(http.ListenAndServe(":"+p, nil))
}
