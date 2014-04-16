if [ -z $GOPATH ]; then
  export GOPATH=~/go
fi
go get labix.org/v2/mgo
