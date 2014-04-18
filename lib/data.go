package lib

import (
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

type Topic struct {
	Title       string
	Permalink   string
	Description string
}

type DataAccess struct {
}

func panicOn(msg string, err error) {
	if err != nil {
		panic(msg + ":" + err.Error())
	}
}

func runInSession(query func(*mgo.Database)) {
	session, err := mgo.Dial("localhost")
	panicOn("Error in connecting to server", err)
	defer session.Close()

	query(session.DB("ath2014"))
}

func (d *DataAccess) InsertTopic(t Topic) {
	runInSession(func(db *mgo.Database) {
		err := db.C("topics").Insert(t)
		panicOn("Cannot Insert", err)
	})
}

func (d *DataAccess) GetTopics() []Topic {
	result := []Topic{}
	runInSession(func(db *mgo.Database) {
		err := db.C("topics").Find(bson.M{}).All(&result)
		panicOn("Cannot find element", err)
	})
	return result
}
