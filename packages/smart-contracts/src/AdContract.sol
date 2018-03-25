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

    event AdRequest (
        string ipfsHash,
        bool approved
    );

    function AdContract (uint256 wps, bool _autoApprove) public payable {
        weiPerHour = wps;
        autoApprove = _autoApprove;
    }

    function setPrice (uint256 wps) public onlyOwner() returns(uint256) {
        weiPerHour = wps;
    }

    function setAutoApprove (bool _autoApprove) public onlyOwner() returns(uint256) {
        autoApprove = _autoApprove;
    }

    function adCount () public view returns(uint) {
        return ads.length;
    }

    function buyAdTime (string ipfsHash) public payable {
        uint256 hoursPurchased = msg.value/weiPerHour;
        require(hoursPurchased >= 1);
        uint256 secondsPurchased = msg.value * 3600;
        uint256 endTime = block.timestamp + secondsPurchased;
        if(autoApprove) {
            ads.push(AdData(block.timestamp, endTime, ipfsHash, autoApprove));
        } else {
            pendingAds.push(AdData(block.timestamp, endTime, ipfsHash, autoApprove));
        }
        emit AdRequest(ipfsHash, autoApprove);
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
