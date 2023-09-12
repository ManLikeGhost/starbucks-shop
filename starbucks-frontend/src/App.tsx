import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import abi from './contractJson/starbuckTeaShop.json'
import Context from './components/Context';
import Purchase from './components/Purchase';
import starBucksParody from './assets/starbuckscoffeeparodylogo.jpeg';
import './App.css'

const App = () => {
  const [state, setState] = useState<unknown>({
    provider: null,
    signer: null,
    contract: null,
  })

  const [account, setAccount] = useState('Not connected')

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x93107c25BF1e4cA6007FFB225b3626Cb40912083";
      const contractABI = abi.abi;

      // Metamask Connection

      const { ethereum } = window;

      try {
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        window.ethereum.on("Account Changed", () => {
          window.location.reload()
        })
        setAccount(account)
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log("BIG_TIME_CONTRACT", contract)
        setState({ provider, signer, contract })
      } catch (error) {
        console.log("ERROR FROM APP", error)
      }

    }
    template()
  }, [])


  return (
    <>
      <div className='center-elements'>
        <div className='row-elements'>
          <img src={starBucksParody} className="img-fluid" alt=".." width={250} height={250} />
          <p style={{ marginTop: "10px", marginLeft: "5px" }}>
            <small style={{color:'white'}}>Connected Account - {account}</small>
          </p>
          <Purchase state={state} />
        </div>
      </div>
      <div className='Transaction-data'><Context state={state} /></div>

    </>
  )
}

export default App
