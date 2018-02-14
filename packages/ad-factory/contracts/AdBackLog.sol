pragma solidity ^0.4.18;
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";


contract AdBackLog is Ownable {
    struct Ad {
        uint startTime;
        uint endTime;
        string ipfsHash;
    }
    
    address public owner;
    uint256 public weiPerSecond;
    Ad[] private ads;

    function AdBackLog (uint256 wps ) public {
        weiPerSecond = wps;
        owner = msg.sender;
    }

    function setPrice (uint256 wps) public onlyOwner() returns(uint256) {
        weiPerSecond = wps;
        return wps;
    }

    function buyAdTime (string ipfsHash) public payable {
        if (owner.send(msg.value)) {
            var secondsPurchased = msg.value/weiPerSecond;
            var endTime = block.timestamp + secondsPurchased;
            var ad = Ad(block.timestamp, endTime, ipfsHash);
            ads.push(ad);
        }
    }

    function nextAvailableTimeStamp () 
    public 
    view
    returns (uint256) {
        var nextAvailableTime = block.timestamp;
        for (uint256 i = 0; i < ads.length; ++i) {
            var ad = ads[i];
            if (ad.startTime > block.timestamp && ad.endTime < nextAvailableTime) {
                nextAvailableTime = ad.endTime;
            }
        }
        return nextAvailableTime;
    }
}
