import React from 'react';
import { useForm } from 'react-hook-form';
import { Recipy } from '../model/recipies.model';
import { ERROR_MESSAGES } from '../common/constants';

interface AddRecipyProps {
    updateRecipyList: (newRecipy: Recipy) => void;
}

interface FormData {
    name: string;
    ingredients: string;
    preparationPeriod: number;
    productImage: FileList;
}

const AddRecipy: React.FC<AddRecipyProps> = ({ updateRecipyList }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        // Form submission logic
        console.log('Submit', data);

        // Assuming you have a function to create a Recipy object
        const newRecipy: Recipy = {
            name: data.name,
            ingredients: [data.ingredients],
            preparationTime: data.preparationPeriod,
            preparationSteps: []
        };

        // Update Recipy list
        updateRecipyList(newRecipy);

        // Reset the form
        reset();
    };

    return (
        <div className="col-xl">
            <div className="card p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="productName" className="form-label">
                            Product Name
                        </label>
                        <input
                            id="productName"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Product name"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <p className="error-message">{ERROR_MESSAGES.required}</p>}
                    </div>
                    <br />
                    <div>
                        <label htmlFor="productDescription" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="productDescription"
                            className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                            placeholder="Description"
                            {...register('ingredients', { required: true })}
                            rows={5}
                        />
                        {errors.ingredients && <p className="error-message">{ERROR_MESSAGES.required}</p>}
                    </div>
                    <br />

                    <div>
                        <label htmlFor="productImage">Image of recipe</label>
                        <input
                            id="productImage"
                            className={`form-control ${errors.productImage ? 'is-invalid' : ''}`}
                            type="file"
                            {...register('productImage', { required: true })}
                        />
                        {errors.productImage && <p className="error-message">{ERROR_MESSAGES.required}</p>}
                    </div>
                    <br />
                    <button type="button" className="btn btn-link" onClick={() => {}}>
                        Add Parameters
                    </button>
                    <br />

                    <div className="col-md-12 text-center">
                        <button type="submit">ADD Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipy;
