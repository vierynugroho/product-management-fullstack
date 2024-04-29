import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditProduct = ({ productId, productName }) => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');

	useEffect(() => {
		const getProductById = async () => {
			const response = await axios.get(`http://localhost:2000/api/v1/products/${productId}`);
			setName(response.data.data.name);
			setPrice(response.data.data.price);
		};

		getProductById();
	}, [productId]);

	const saveProduct = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.patch(`http://localhost:2000/api/v1/products/${productId}`, {
				name: name,
				price: Number(price),
			});

			toast.success(response.data.message, {
				style: {
					backgroundColor: 'green',
					color: 'white',
				},
				iconTheme: {
					primary: 'white',
					secondary: 'green',
				},
			});
		} catch (error) {
			toast.error(error.response.data.message, {
				style: {
					backgroundColor: 'red',
					color: 'white',
				},
				iconTheme: {
					primary: 'white',
					secondary: 'red',
				},
			});
		}
	};

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant='outline'
						className='bg-yellow-400 hover:bg-yellow-500 hover:text-white border border-slate-50 text-white font-bold py-2 px-4 rounded-lg'
					>
						<i className='fa-solid fa-pen-to-square'></i> &nbsp; Edit Product
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Edit Product</DialogTitle>
						<DialogDescription>
							Make change for your <span className='font-bold size-2 text-red-700'>{productName}</span>. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<form
						className='my-5'
						onSubmit={saveProduct}
					>
						<div className='flex flex-col'>
							<div>
								<label className='font-bold text-white'>Product Name</label>
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									type='text'
									className='w-full py-3 mt-1 border border-slate-600 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover: shadow'
									placeholder='Product Name'
								/>
							</div>
							<div className='mb-10'>
								<label className='font-bold text-white'>Price</label>
								<input
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									type='number'
									className='w-full py-3 mt-1 border border-slate-600 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover: shadow'
									placeholder='Product Price'
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<button
									type='submit'
									className='w-full py-3 font-bold text-white bg-black hover:bg-slate-900 rounded-lg border-slate-500 hover:shadow'
								>
									<i className='fa-solid fa-floppy-disk'></i> &nbsp; Save
								</button>
							</DialogClose>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default EditProduct;
