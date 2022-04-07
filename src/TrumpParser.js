import React from "react";
import { ReactDOM } from "react";
import myJson from './json/trump-tweets.json';

class TrumpParser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myout: [{}],
            machineOut: "",
            tag: "trump"
        }
    }

    componentDidMount() {
        let myarray = JSON.parse(JSON.stringify(myJson));
        console.log(myarray);
        this.setState({myout: myarray})
        //this.parseTweet(myarray);
        this.removeKey(myarray);
    }

    removeKey(myarray) {
        // remove http/s as well
        let patternHttps = /https/i;
        let patternHttp = /http/i;
        let patternAt = /@/i;
        let patternHash = /#/i;

        let i = 0;

        //let trumpTweets = JSON.parse(JSON.stringify(myarray));

        let trumpTweets = [];
        let mytweet = "";
        myarray.slice(0, 10).map(item => {
            mytweet = "";
            mytweet = JSON.stringify(item, (key, value) => {
                /*
                "id": 1234653427789070300,
        "text": "I was thrilled to be back in the Great city of Charlotte, North Carolina with thousands of hardworking American Patriots who love our Country, cherish our values, respect our laws, and always put AMERICA FIRST! Thank you for a wonderful evening!! #KAG2020 https://t.co/dNJZfRsl9y",
        "isRetweet": "f",
        "isDeleted": "f",
        "device": "Twitter for iPhone",
        "favorites": 73748,
        "retweets": 17404,
        "date": "2020-03-03 01:34:50",
        "isFlagged": "f"
        */
                if (key === "id" ||
                    key === "isRetweet" ||
                    key === "isDeleted" ||
                    key === "device" ||
                    key === "favorites" ||
                    key === "retweets" ||
                    key === "date" ||
                    key === "isFlagged") { 
                    return undefined;
                }
                console.log(value);
                return value;
            });

            i++;
            console.log(mytweet);
            trumpTweets.push(mytweet);
        })

        console.log(trumpTweets);

        this.setState({machineOut: trumpTweets, tweetCount: i});
    }
    
    /*
    parseTweet(arr) {
        let prepMachineLearning = "";
        let tag = this.state.tag;
        // this is for the model so it know when a passage is complete
        let delimeter = "\n\n<|endoftext|>\n\n";

        // tweets tend to have links, i do not want those
        let patternHttps = /https/i;
        let patternHttp = /http/i;

        // tweets also tend to have @'s and I do not want them
        let patternAt = /@/i;

        let i = 0;
        
        // maxcount = 56571
        // roughly 1/4 trump tweets are usable
        let testCount = 56571;

        arr.slice(0,testCount).map((item) => {
            if (patternHttps.test(item.text) === false && 
                patternHttp.test(item.text) === false && 
                patternAt.test(item.text) === false) {
                // it is looking like we need to tag our data if
                // we want reasonable output
                // if we do not tag and input any text the model
                // returns what it was generically trained on
                prepMachineLearning += tag;
                prepMachineLearning += "\n";
                prepMachineLearning += item.text;
                prepMachineLearning += delimeter;
                i++;
            }
        })

        this.setState({machineOut: prepMachineLearning, tweetCount: i});
    }
    */

    render() {
        return (
            <div className="tweet-header">
                <p>Hello from trump: useable tweets #{this.state.tweetCount}</p> 
                <textarea value={this.state.machineOut} cols="50" rows="13"></textarea>
            </div>
        );
    }

}

export default TrumpParser;