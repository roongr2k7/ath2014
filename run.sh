if [ -z $GOPATH ]; then
  export GOPATH=~/go
fi
go run app.go
