import React, { useState } from 'react';
import { ethers } from 'ethers';

// Define a TypeScript interface for your contract
interface MyContract {
  buyChai: (
    name: string,
    message: string,
    teaTypePurchased: string,
    amount: { value: string }
  ) => Promise<never>; // Adjust the return type if necessary
}

interface IProps {
  name: string;
  message: string;
  contract: MyContract; // Use the specific contract interface
  // state: object;
}

const Purchase: React.FC<IProps> = ({ state }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    teaTypePurchased: '',
    amount: '',
  });

  const { name, message, teaTypePurchased, amount } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBuyStarBucksCoffee = async (e: React.FormEvent) => {
    e.preventDefault();
    const {contract}=state;
    console.log("_Contract_", contract);
    console.log('Form submitted with data:', formData);
    const parsedAmount = ethers.utils.parseEther(formData.amount);
    const name = formData.name;
    const message = formData.message;
    const teaTypePurchased = formData.teaTypePurchased;
    const transaction = await contract.buyChai(
      name,
      message,
      teaTypePurchased,
      { value: parsedAmount.toString() } // Pass the amount as an object
    );
    setFormData({
      name: '',
      message: '',
      teaTypePurchased: '',
      amount: '',
    });
    await transaction.wait()
    alert("Transaction successful!!")
    window.location.reload()
  };

  return (
    <>
      <form onSubmit={handleBuyStarBucksCoffee} className='input-form-feilds'>
        <div className='row-elements'>
          <label className='spacing'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Insert name here'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='row-elements'>
          <label className='spacing'>Message</label>
          <textarea
            name='message'
            placeholder='Insert message here'
            value={message}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='row-elements'>
          <label className='spacing'>Type of Beverage</label>
          <select name='teaTypePurchased' value={teaTypePurchased} onChange={(e) => onChange(e)}>
            <option value="">Select a beverage</option>
            <option value="Latte">Latte</option>
            <option value="Chai">Chai</option>
            <option value="Black-Coffee">Black-Coffee</option>
            <option value="Vanilla-flavoured-tea">Vanilla-flavoured-tea</option>
            <option value="Passion-fruit-tea">Passion-fruit-tea</option>
          </select>
        </div>
        <div className='row-elements'>
          <label className='spacing'>Amount</label>
          <input
            type='number'
            name='amount'
            placeholder='Insert amount here'
            value={amount}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className='spacing button-bg'>Pay</button>
      </form>
    </>
  );
};

export default Purchase;
