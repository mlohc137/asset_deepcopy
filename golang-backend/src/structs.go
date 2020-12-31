package main

const ZEROXURLFORMATSTR = "https://api.0x.org/swap/v1/quote?buyToken=%s&sellToken=%s&sellAmount=%s"
const ZEROXURLPRICEFORMATSTR = "https://api.0x.org/swap/v1/quote?buyToken=%s&sellToken=%s&sellAmount=%d"
const ETHPLORERFORMATSTR = "https://api.ethplorer.io/getAddressInfo/%s?apiKey=%s"
const ETHPLORERADDRHIST = "https://api.ethplorer.io/getAddressHistory/%s?apiKey=%s&token=%s&limit=1"
const ETHPLORERTSHIST = "https://api.ethplorer.io/getAddressTransactions/%s?apiKey=%s&timestamp=%d"

// Built off work done by https://github.com/serenedoge

type APIHandler struct {
}

type DateTimestamp struct {
	Value int
}

type EtherscanTokenTxByAddress struct {
	TokenTxs []struct {
		BlockNumber       int     `json:"blockNumber,string"`
		TimeStamp         int     `json:"timeStamp,string"`
		Hash              string  `json:"hash"`
		Nonce             int     `json:"nonce,string"`
		BlockHash         string  `json:"blockHash"`
		From              string  `json:"from"`
		ContractAddress   string  `json:"contractAddress"`
		To                string  `json:"to"`
		Value             float64 `json:"value,string"`
		TokenName         string  `json:"tokenName"`
		TokenSymbol       string  `json:"tokenSymbol"`
		TokenDecimal      int     `json:"tokenDecimal,string"`
		TransactionIndex  int     `json:"transactionIndex,string"`
		Gas               float64 `json:"gas,string"`
		GasPrice          float64 `json:"gasPrice,string"`
		GasUsed           float64 `json:"gasUsed,string"`
		CumulativeGasUsed float64 `json:"cumulativeGasUsed,string"`
		Confirmations     int     `json:"confirmations,string"`
	} `json:"result"`
}
