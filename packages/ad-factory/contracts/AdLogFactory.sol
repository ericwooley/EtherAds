pragma solidity ^0.4.19;
import "./AdBackLog.sol";


contract AdLogFactory {
    address public donationAddress;
    mapping(address => address[]) public listings;
    
    event ContractCreated (
        address addr,
        address owner
    );

    function AdLogFactory (address _donationAddress) public {
        donationAddress = _donationAddress;
    }

    function() public payable {}
        
    function listingsByOwner (address _address) public view returns(address[]) {
        return listings[_address];
    }
    
    function withdraw () public {
        donationAddress.transfer(address(this).balance);
    }

    function deployAd(
        uint256 _weiPerHour,
        bool _autoApprove
        ) public payable {
        AdBackLog adBackLog = new AdBackLog(_weiPerHour, _autoApprove);
        adBackLog.transferOwnership(msg.sender);
        emit ContractCreated(adBackLog, msg.sender);
        // if ( msg.value > 10 finney ) {
            listings[msg.sender].push(adBackLog);
        // }
    }
}
