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
        this.parseTweet(myarray);
    }
    
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