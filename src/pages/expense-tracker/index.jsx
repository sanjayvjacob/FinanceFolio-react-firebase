import {useState} from 'react'
import { signOut } from 'firebase/auth';
import useAddTransaction from "../../hooks/useAddTransaction"
import useGetTransactions from '../../hooks/useGetTransactions';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { useNavigate } from 'react-router-dom';

import "./styles.css"
import { auth } from '../../config/firebase-config';
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";


const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div>
    <h1 className='title'>FinanceFolio</h1>
    </div>
    <div className='main-container'>
      
          {profilePhoto && (
          <div className="profile">
            <h1 className='name'>{name}</h1>
            <img className="profile-photo" src={profilePhoto} />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      <div className="expense-tracker">
        <div className="container">
          <div className="balance">
            <h3> Your Balance</h3>
            {balance >= 0 ? <h2> £{balance}</h2> : <h2> -£{balance * -1}</h2>}
          </div>

          <div className="summary">

            <div className="income">
              <h4>Total Income</h4>
              <p>£{income}</p>
            </div>

            <div className="expenses">
              <h4>Total Expenses</h4>
              <p>£{expenses}</p>
            </div>

          </div>

          <form className="add-transaction" onSubmit={onSubmit}>
            <div className='form-container'>
              <div className='input-1'>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            </div>
            <div className='input-2'>
            <input
              className='radio-input'
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense"> Expense</label>
            <input
              className='radio-input'
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income</label>
            </div>
            </div>
            <button type="submit" className='add-transaction-btn'><IoAddCircle style={{ fontSize: '20px' }} />Transaction</button>
          </form>
        </div>
      </div>

      <div className="transactions">
        <h3> Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li>
                <h4> {description} </h4>
                <p>
                  £{transactionAmount} •{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </>
  );
}

export default ExpenseTracker