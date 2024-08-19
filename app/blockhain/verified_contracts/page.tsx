'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const data = [
  {
    category: 'CONTRACTS DEPLOYED (TOTAL)',
    stat: '6',
  },
  {
    category: 'CONTRACTS DEPLOYED (24H)',
    stat: '0',
  },
  {
    category: 'CONTRACTS VERIFIED (TOTAL)',
    stat: '0',
  },
  {
    category: 'CONTRACTS VERIFIED (24H)',
    stat: '0',
  }
];

const transactionData = [
  {
    transactionHash: "0x141505dd2b003499e72c717a7cae10219a49b7c1ec5652c1602fe7468a2fa2a1",
    method: "0xa9059cbb",
    block: 212367,
    age: "11",
    from: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010203
  },
  {
    transactionHash: "0x691ddbfe7cb9f2988c8753ee81890323ec88d91dcb4a30af505980137fbfb13e",
    method: "0xa9059cbb",
    block: 212387,
    age: "11",
    from: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010108
  },
  {
    transactionHash: "0x103a91edc15a6de39c3db401bd092e3957b1058b79eb083a4c96cf35742e96c4",
    method: "0xa9059cbb",
    block: 212392,
    age: "11",
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    value: 0,
    transactionFee: 0.00010603
  },
  {
    transactionHash: "0xfe99b0e3457f41d54cad21e5d6d17f019037ed3e3d71ac3aaa4d7edac72e00a7",
    method: "0xa9059cbb",
    block: 212480,
    age: "11",
    from: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010703
  },
  {
    transactionHash: "0x3f5e380ad7be09089ebd171748bfc390d7f77e1d8c2011765e3b3b3ae2aaf5ce",
    method: "0xa9059cbb",
    block: 212600,
    age: "11",
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    value: 0,
    transactionFee: 0.00010224
  },
  {
    transactionHash: "0x6be5f8dbb3f1132dbdc6bbb52642685b793545ff163ecdbca59e18a68aef627c",
    method: "0xa9059cbb",
    block: 212865,
    age: "12",
    from: "0x2D1cAAFa3e777a611959e30266a51Cf34Cd74Ed9",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010205
  },
  {
    transactionHash: "0xa4410a6d90e5a4bc051f2e93ea4718a40e920575ef80ade92eb37b5617b19dd7",
    method: "0xa9059cbb",
    block: 212880,
    age: "12",
    from: "0x37E1176556c962D0B6C4439c385FAb211df6Dbf0",
    to: "0x4EcA56058CACcb6C6A1eda3F2D68Aca705805E0c",
    value: 0,
    transactionFee: 0.00010304
  },
  {
    transactionHash: "0xc1298b179b7bf06ef92c9b5604a296c56ca26856fc9489d11115bc1451379d55",
    method: "0xa9059cbb",
    block: 212911,
    age: "12",
    from: "0x203480649706602d970e823e9190A5EB3c9631c0",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    value: 0,
    transactionFee: 0.00010203
  },
  {
    transactionHash: "0x530cf3591b5f4f3345251c9989e6cef014b0b6cbadf1ba3d6cd2118c156675f1",
    method: "0xa9059cbb",
    block: 212923,
    age: "12",
    from: "0xBDb294121A3fe6228BE4c2625C2ccCA0027A7772",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010421
  },
  {
    transactionHash: "0x7589516e6c0cee8f79d83ca01a060e2c15fd9130811ea993bff821f2569698bf",
    method: "0xa9059cbb",
    block: 212930,
    age: "12",
    from: "0x37E1176556c962D0B6C4439c385FAb211df6Dbf0",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    value: 0,
    transactionFee: 0.00010720
  },
]

const abiJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"proposals\",\"outputs\":[{\"name\":\"recipient\",\"type\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\"},{\"name\":\"description\",\"type\":\"string\"},{\"name\":\"votingDeadline\",\"type\":\"uint256\"},{\"name\":\"open\",\"type\":\"bool\"},{\"name\":\"proposalPassed\",\"type\":\"bool\"},{\"name\":\"proposalHash\",\"type\":\"bytes32\"},{\"name\":\"proposalDeposit\",\"type\":\"uint256\"},{\"name\":\"newCurator\",\"type\":\"bool\"},{\"name\":\"yea\",\"type\":\"uint256\"},{\"name\":\"nay\",\"type\":\"uint256\"},{\"name\":\"creator\",\"type\":\"address\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"minTokensToCreate\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"rewardAccount\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"daoCreator\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"divisor\",\"outputs\":[{\"name\":\"divisor\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"extraBalance\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_proposalID\",\"type\":\"uint256\"},{\"name\":\"_transactionData\",\"type\":\"bytes\"}],\"name\":\"executeProposal\",\"outputs\":[{\"name\":\"_success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"unblockMe\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalRewardToken\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"actualBalance\",\"outputs\":[{\"name\":\"_actualBalance\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"closingTime\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"allowedRecipients\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferWithoutReward\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"refund\",\"outputs\":[],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_recipient\",\"type\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\"},{\"name\":\"_description\",\"type\":\"string\"},{\"name\":\"_transactionData\",\"type\":\"bytes\"},{\"name\":\"_debatingPeriod\",\"type\":\"uint256\"},{\"name\":\"_newCurator\",\"type\":\"bool\"}],\"name\":\"newProposal\",\"outputs\":[{\"name\":\"_proposalID\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"DAOpaidOut\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"minQuorumDivisor\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newContract\",\"type\":\"address\"}],\"name\":\"newContract\",\"outputs\":[],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_recipient\",\"type\":\"address\"},{\"name\":\"_allowed\",\"type\":\"bool\"}],\"name\":\"changeAllowedRecipients\",\"outputs\":[{\"name\":\"_success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"halveMinQuorum\",\"outputs\":[{\"name\":\"_success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"paidOut\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_proposalID\",\"type\":\"uint256\"},{\"name\":\"_newCurator\",\"type\":\"address\"}],\"name\":\"splitDAO\",\"outputs\":[{\"name\":\"_success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"DAOrewardAccount\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"proposalDeposit\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"numberOfProposals\",\"outputs\":[{\"name\":\"_numberOfProposals\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"lastTimeMinQuorumMet\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_toMembers\",\"type\":\"bool\"}],\"name\":\"retrieveDAOReward\",\"outputs\":[{\"name\":\"_success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"receiveEther\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"isFueled\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_tokenHolder\",\"type\":\"address\"}],\"name\":\"createTokenProxy\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_proposalID\",\"type\":\"uint256\"}],\"name\":\"getNewDAOAddress\",\"outputs\":[{\"name\":\"_newDAO\",\"type\":\"address\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_proposalID\",\"type\":\"uint256\"},{\"name\":\"_supportsProposal\",\"type\":\"bool\"}],\"name\":\"vote\",\"outputs\":[{\"name\":\"_voteID\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"getMyReward\",\"outputs\":[{\"name\":\"_success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"rewardToken\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFromWithoutReward\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"remaining\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_proposalDeposit\",\"type\":\"uint256\"}],\"name\":\"changeProposalDeposit\",\"outputs\":[],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"blocked\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"curator\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_proposalID\",\"type\":\"uint256\"},{\"name\":\"_recipient\",\"type\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\"},{\"name\":\"_transactionData\",\"type\":\"bytes\"}],\"name\":\"checkProposalCode\",\"outputs\":[{\"name\":\"_codeChecksOut\",\"type\":\"bool\"}],\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"privateCreation\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"type\":\"function\"},{\"inputs\":[{\"name\":\"_curator\",\"type\":\"address\"},{\"name\":\"_daoCreator\",\"type\":\"address\"},{\"name\":\"_proposalDeposit\",\"type\":\"uint256\"},{\"name\":\"_minTokensToCreate\",\"type\":\"uint256\"},{\"name\":\"_closingTime\",\"type\":\"uint256\"},{\"name\":\"_privateCreation\",\"type\":\"address\"}],\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"FuelingToDate\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"CreatedToken\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Refund\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"proposalID\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"recipient\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"newCurator\",\"type\":\"bool\"},{\"indexed\":false,\"name\":\"description\",\"type\":\"string\"}],\"name\":\"ProposalAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"proposalID\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"position\",\"type\":\"bool\"},{\"indexed\":true,\"name\":\"voter\",\"type\":\"address\"}],\"name\":\"Voted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"proposalID\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"result\",\"type\":\"bool\"},{\"indexed\":false,\"name\":\"quorum\",\"type\":\"uint256\"}],\"name\":\"ProposalTallied\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_newCurator\",\"type\":\"address\"}],\"name\":\"NewCurator\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_recipient\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_allowed\",\"type\":\"bool\"}],\"name\":\"AllowedRecipientChanged\",\"type\":\"event\"}]"

export default function VerifiedContractPage(txId: String) {
  const urlEtherscan = "https://api.etherscan.io/api"
  const urlBeth = "https://rpc.bethscan.org"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  const [accountList, setAccountList] = useState<any[]>([])

  const getContracts = async () => {
    try {
      // console.log("tai dah");
      
      // let address = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
      let address = "0x829b3909343e06442b87e108d7b9a2768ab195c6"
      var contract = await new web3.eth.Contract(JSON.parse(abiJson), address);
      // console.log("contract: ", contract);
      let totalSupplyContract = await contract.methods.totalSupply().call()
      let contractMethods = await contract.methods
      // console.log("contractMethods: ", contractMethods);
      
      // console.log("totalSupplyContract: ", totalSupplyContract);
      
      let params = {
        module: "contract",
        action: "getabi",
        contractaddresses: "0",
        endBlock: "99999999999999",
        page: 1,
        offset: 0,
        sort: "desc",
        apiKey: "173EA7S7EPZEWEGZX78GNER9KAKX42E3U3"
      }
    } catch (error) {
      console.log("tryCatch error: ", error);
    }
  }

  useEffect(() => {
    // loadBlocks()
    // getAccountList(1);
    getContracts()
  }, []);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Text className='mb-4 text-xl text-neutral-950'>Verified Contracts</Text>
      <div className="border-t-2 border-gray-300 mb-3"></div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {data.map((item, i) => (
          <Card key={item.category}>
            <Title className='text-gray-600'>{item.category}</Title>
            <Text className='text-gray-600'>{
              Intl.NumberFormat('us').format(Number(item.stat)).toString()
          }</Text>
          </Card>
        ))}
      </Grid>
      <Grid numItemsLg={1} className='gap-1 mt-4'>
        <Card className='flex-row w-full overflow-x-auto'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th className="w-200">
                  <Text className='m-2'>Address</Text>
                </th>
                <th className="">
                  <div className='grid grid-rows-1 grid-flow-col gap-2'>
                    <Text className='m-2'>Contract Name</Text>
                  </div>
                </th>
                <th className="">
                  <Text className='m-2'>Compiler</Text>
                </th>
                <th className=" tracking-wider w-200">
                  <div className='grid grid-rows-1 grid-flow-col gap-1 w-300'>
                    <Text className='m-2'>Version</Text>
                  </div>
                </th>
                <th className="">
                  <Text className='m-2'>Balance</Text>
                </th>
                <th className="">
                  <Text className='m-2'>Txns Setting</Text>
                </th>
                <th className="">
                  <Text className='m-2'>Verified</Text>
                </th>
              </tr>
            </thead>
            {/* <div className="border-t-1 border-gray-300 mb-3 w-full"></div> */}
            <tbody className="bg-white divide-y divide-gray-200 mb-2">
              {/* {
                transactionData.map((item, i) => (
                  <tr>
                    <td className='px-6 py-3 w-1 text-left text-xs font-medium tracking-wider'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 w-[200px] truncate text-blue-500'>{item.transactionHash}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1'>{item.method}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.block}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.age}h ago</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 w-[200px] text-ellipsis overflow-hidden text-blue-500'>{item.from}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1  w-[200px] truncate text-blue-500'>{item.to}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.value}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.transactionFee}</Text>
                    </td>
                  </tr>
                ))
              } */}
            </tbody>
          </table>
          <div className="flex h-screen">
            <div className="m-auto">
              <Text className='items-center'>
                There are no matching entries
              </Text>
            </div>
          </div>
        </Card>
      </Grid>
    </main>
  );
}
