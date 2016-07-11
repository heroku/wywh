package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

const (
	defaultPort = "5000" // defaultPort for the application to listen on
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
		p = defaultPort
	}

	http.Handle("/", http.FileServer(http.Dir(a)))
	log.Println(http.ListenAndServe(":"+p, nil))
}
