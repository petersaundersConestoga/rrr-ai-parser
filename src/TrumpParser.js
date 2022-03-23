import React from "react";
import { ReactDOM } from "react";
import myJson from './json/trump-tweets.json';

class TrumpParser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myout: [{}],
            machineOut: ""
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
        let delimeter = "\n\n<|endoftext|>\n\n";
        let patternHttps = /https/i;
        let patternHttp = /http/i;
        let patternAt = /@/i;

        let i = 0;
        
        // maxcount = 56571
        // roughly 1/4 trump tweets are usable
        let testCount = 56571;

        arr.slice(0,testCount).map((item) => {
            if (patternHttps.test(item.text) == false && 
                patternHttp.test(item.text) == false && 
                patternAt.test(item.text) == false) {
                prepMachineLearning += item.text;
                prepMachineLearning += delimeter;
                i++;
            }
        })

        this.setState({machineOut: prepMachineLearning, tweetCount: i});
    }
    /*
{this.state.myout.slice(0, 200).map((member) => ( 
                    <>
                    <p>{member.date} {member.id}</p>
                    <div>{member.text}</div>
                    </>
                ))}
                */
    render() {
        return (
            <div className="tweet-header">
                <p>Hello from trump: useable tweets #{this.state.tweetCount}</p> 
                <textarea value={this.state.machineOut}></textarea>
            </div>
        );
    }

}

export default TrumpParser;