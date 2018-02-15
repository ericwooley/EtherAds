pragma solidity ^0.4.19;
import "./AdContract.sol";


contract AdFactory {
    address public donationAddress;

    event ContractCreated (
        address addr,
        address owner,
        uint256 value
    );

    address[] public testRet;

    function AdFactory (address _donationAddress) public {
        donationAddress = _donationAddress;
        testRet = [_donationAddress];
    }

    function() public payable {}

    function withdraw () public {
        donationAddress.transfer(address(this).balance);
    }

    function test() public view returns(address[]) {
        return testRet;
    }

    function deployAd(
        uint256 _weiPerHour,
        bool _autoApprove
        ) public payable {
        AdContract ad = new AdContract(_weiPerHour, _autoApprove);
        ad.transferOwnership(msg.sender);
        emit ContractCreated(ad, msg.sender, address(this).balance);
    }
}
