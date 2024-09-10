import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const InputModel = ({ isOpen, onClose,  onDataAdded  }) => {
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Post data to the backend
        try {
            await axios.post('/api/add-point', { price: Number(price) });
            onDataAdded(); // Call this function to update the chart
            setPrice(''); // Clear the input field
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error adding price:", error);
        }
    };

    return (

        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add Price Point" className={`w-1/2 h-1/2 border-[1px] flex items-center justify-center flex-col gap-10 rounded-xl bg-gray-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
            <h2 className='text-5xl '>Add a New Price Point</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <div className='flex gap-2'>
                    <label className='font-semibold' >Price:</label>
                    <input type="number" className='rounded' value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <br />
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-xl'>Submit</button>
            </form>
        </Modal>
    );
};

export default InputModel;
