import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51OU34BIPnIHsxJKmgmHhA6CWRnBQj7uldKzP7PVvR32n2CqxmozFu4xEEPDL3PDfEEZ4lGOudY8qs5GeHLpuYLVz00qbGp4xb4')
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Get Payment"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;