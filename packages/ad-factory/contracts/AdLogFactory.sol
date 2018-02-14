pragma solidity ^0.4.18;
import "./AdBackLog.sol";


contract AdLogFactory {
    uint256 public test = 1000;

    event ContractCreated (
        address addr,
        address owner
    );

    function deployAd(uint256 _weiPerSecond) public {
        var adBackLog = new AdBackLog(_weiPerSecond);
        ContractCreated(adBackLog, msg.sender);
    }
}