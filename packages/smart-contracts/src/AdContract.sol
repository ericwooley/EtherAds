pragma solidity ^0.4.19;
import "./../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";


contract AdContract is Ownable {
    struct AdData {
        uint startTime;
        uint endTime;
        string ipfsHash;
        bool approved;
    }

    uint256 public weiPerHour;
    AdData[] public pendingAds;
    AdData[] public ads;
    bool public autoApprove = false;

    function AdContract (uint256 wps, bool _autoApprove) public payable {
        weiPerHour = wps;
        autoApprove = _autoApprove;
    }

    function setPrice (uint256 wps) public onlyOwner() returns(uint256) {
        weiPerHour = wps;
    }

    function buyAdTime (string ipfsHash) public payable {
        owner.transfer(msg.value);
        uint256 hoursPurchased = msg.value/weiPerHour;
        uint256 endTime = block.timestamp + hoursPurchased;
        AdData memory ad = AdData(block.timestamp, endTime, ipfsHash, autoApprove);
        if(autoApprove) {
            ads.push(ad);
        } else {
            pendingAds.push(ad);
        }
    }

    function nextAvailableTimeStamp ()
    public
    view
    returns (uint256) {
        uint nextAvailableTime = block.timestamp;
        for (uint256 i = 0; i < ads.length; ++i) {
            AdData memory ad = ads[i];
            if (ad.startTime > block.timestamp && ad.endTime < nextAvailableTime) {
                nextAvailableTime = ad.endTime;
            }
        }
        return nextAvailableTime;
    }
}
