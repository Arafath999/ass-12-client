import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import { MdLocalOffer } from "react-icons/md";
import Swal from "sweetalert2";

const MakeOfferForm = () => {
  const item = useLoaderData()
  const { user } = useAuth();
  console.log(user)
  console.log(item)
  const [offeredAmount, setOfferedAmount] = useState("");
  // const [buyerName, setBuyerName] = useState("");
  const [buyingDate, setBuyingDate] = useState("");

  const handleOffer = async () => {
    const response = await fetch('https://assignment-12-server-eight-olive.vercel.app/makeoffer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyTitle: item.propertyTitle,
        propertyImage: item.propertyImage,
        propertyLocation: item.propertyLocation,
        agentEmail: item.agentEmail,
        agentName: item.agentName,
        offeredAmount,
        buyerEmail: item.email,
        buyerName: user?.displayName,
        buyingDate,
        verificationStatus: item.verificationStatus,

      }),
    });

    if (response.ok) {
      Swal.fire({
        title: `${item.propertyTitle}`,
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
      setOfferedAmount('');
      // setBuyerName('');
      setBuyingDate('');
    } else {
      console.error('Failed to submit offer');
    }
  };
  return (
    <div className="">
      <SectionTitle heading="Make Offer" subHeading="Offer From"></SectionTitle>
      <div>
        <form className="border bg-base-300 ml-8 rounded-xl shadow-xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 ml-4 space-y-8">
          <div className="form-control w-full my-6">
            <label className="label font-bold">Property Title</label>
            <textarea className="textarea textarea-bordered w-56 h-12" type="text" value={item.propertyTitle} readOnly />
          </div>

          <div className="form-control w-full my-6">
            <label className="label font-bold">Property Location</label>
            <textarea className="textarea textarea-bordered w-64 h-12" type="text" value={item.propertyLocation} readOnly />
          </div>

          <div>
            <label className="label font-bold">Agent Name</label>
            <textarea className="textarea textarea-bordered w-64 h-12" value={item.agentName} readOnly />
          </div>
          <div>
            <label className="label font-bold">Agent email</label>
            <textarea className="textarea textarea-bordered w-64 h-12" value={item.agentEmail} readOnly />
          </div>
          <div>
            <label className="label font-bold">Offered Amount</label>
            <input
              className="border text-red-600 border-solid border-gray-300 pl-4 font-bold"
              type="number"
              value={offeredAmount}
              onChange={(e) => setOfferedAmount(e.target.value)}
            />

          </div>
          <div>
            <label className="label font-bold">Buyer Email:-</label>
            <input className="textarea-bordered pl-4 text-red-600 font-bold" type="text" value={item.email} readOnly />
          </div>
          <div>
            <label className="label font-bold">Buyer Name:-</label>
            <input className="textarea-bordered pl-4 text-red-600 font-bold" type="text" value={user?.displayName} readOnly />
          </div>
          <div>
            <label className="label font-bold">Buying Date</label>
            <input
              type="date"
              value={buyingDate}
              onChange={(e) => setBuyingDate(e.target.value)}
            />
          </div>
          <div>
            <label className="label font-bold">VerificationStatus</label>
            <input className="textarea-bordered pl-4 text-red-600 font-bold" type="text" value={item.verificationStatus} readOnly />
          </div>
          
        </div>
        <div className="flex justify-center">
          {/* <button className="card-action btn mt-4 ml-4 btn-secondary justify-center" onClick={handleOffer}>
          Make Offer
        </button> */}
          <button className="btn btn-outline btn-secondary border-0 border-b-4 " onClick={handleOffer}>Make Offer <MdLocalOffer /> </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default MakeOfferForm;

