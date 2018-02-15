pragma solidity ^0.4.19;
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";


contract AdBackLog is Ownable {
    struct Ad {
        uint startTime;
        uint endTime;
        string ipfsHash;
        bool approved;
    }
    
    uint256 public weiPerHour;
    Ad[] private ads;
    bool public autoApprove = false;

    function AdBackLog (uint256 wps, bool _autoApprove) public payable {
        weiPerHour = wps;
        autoApprove = _autoApprove;
    }

    function setPrice (uint256 wps) public onlyOwner() returns(uint256) {
        weiPerHour = wps;
    }

    function buyAdTime (string ipfsHash) public payable {
        if (owner.send(msg.value)) {
            uint256 hoursPurchased = msg.value/weiPerHour;
            uint256 endTime = block.timestamp + hoursPurchased;
            var ad = Ad(block.timestamp, endTime, ipfsHash, autoApprove);
            ads.push(ad);
        }
    }

    function nextAvailableTimeStamp () 
    public 
    view
    returns (uint256) {
        uint nextAvailableTime = block.timestamp;
        for (uint256 i = 0; i < ads.length; ++i) {
            var ad = ads[i];
            if (ad.startTime > block.timestamp && ad.endTime < nextAvailableTime) {
                nextAvailableTime = ad.endTime;
            }
        }
        return nextAvailableTime;
    }
}
