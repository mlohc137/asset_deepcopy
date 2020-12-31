package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	// HandleFunc tells handler on accessing of localhost:1234/, return whatever is written
	// to ResponseWriter from the inputs defined in Request.
	// TODO: Add Error checking if address not provided.
	// TODO: Add Error handling to React side incase API query fails.
	http.HandleFunc("/firstTxnDate", handleFirstTxnDate)
	fmt.Printf("Starting DeepCopy server on port 1234\n")
	if err := http.ListenAndServe(":1234", nil); err != nil {
		log.Fatal(err)
	}
	return
}

// API INTERNAL FUNCTIONS
func getLocalJSONFromAddress(address string) []byte {
	// fakedata jsons will follow filename format <address>.json
	filename := "../fakedata/" + address + ".json"
	jsonFile, err := os.Open(filename)
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()

	jsonData, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		log.Fatalln(err)
	}
	// return jsonData in byte, not string format for Unmarshal consumption
	return jsonData
}

func getEtherscanTokenTx(address string) EtherscanTokenTxByAddress {
	response := getLocalJSONFromAddress(address)
	var addressTokenTxs EtherscanTokenTxByAddress
	err := json.Unmarshal(response, &addressTokenTxs)
	if err != nil {
		log.Println(err)
	}
	return addressTokenTxs
}

// API EXTERNAL FUNCTIONS
func (api APIHandler) getFirstTxnDate(address string) DateTimestamp {
	addressTokenTxs := getEtherscanTokenTx(address)
	var FirstTxnDate = DateTimestamp{Value: addressTokenTxs.TokenTxs[0].TimeStamp}
	return FirstTxnDate
}

// API ROUTE HANDLERS
func handleFirstTxnDate(w http.ResponseWriter, r *http.Request) {
	api := &APIHandler{}
	jsonString, _ := json.Marshal(api.getFirstTxnDate(r.URL.Query()["address"][0]))
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(jsonString)
}
