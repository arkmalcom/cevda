package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"cevda/assessments/dynamodb"
)

func main() {
	ctx := context.Background()
	log.Println("Starting server on :8080")

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	dynamodb.Init()
	dynamodb.CreateTablesIfLocal(ctx)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", "8080"), nil))

}
