import React from "react";
import "./doctor-edit-voucher-session.styles.scss";
import deteleIcon from "../../../assets/post/trash_icon.svg";
import procedureImg from "../../../assets/procedure/facelift.svg";
const DoctorEditVoucherSession = () => {
  return (
    <div className="doctor-edit-voucher-session">
      <div className="voucher-session-title-conatiner">
        <span>Voucher</span>
      </div>
      <div className="voucher-added-container">
        <div className="voucher-added-img-container"></div>
        <div className="voucher-info-session1">
          <textarea
            className="voucher-textarea"
            style={{ height: "46px" }}
            placeholder="Enter Your Service Name"
          />
          <textarea
            className="voucher-textarea"
            style={{ height: "180px" }}
            placeholder="Enter Your Voucher Details"
          />
        </div>
        <div className="voucher-info-session2">
          <textarea
            className="voucher-textarea"
            style={{ height: "46px" }}
            placeholder="Original Price"
          />
          <textarea
            className="voucher-textarea"
            style={{ height: "46px" }}
            placeholder="Price after Promotion"
          />
          <textarea
            className="voucher-textarea"
            style={{ height: "46px" }}
            placeholder="when Promo ends: dd/mm/yyyy"
          />
          <div className="voucher-info-session2-button">
            <button className="voucher-pink-button">Save</button>
            <button>
              <img
                src={deteleIcon}
                style={{ width: "42px", height: "42px" }}
              ></img>
            </button>
          </div>
        </div>
      </div>
      <div className="voucehr-detail-conatienr">
        <div className="voucher-procedure-container">
          <img src={procedureImg}></img>
          <span>Botox Injection</span>
        </div>
        <div className="voucher-procedure-detail-text">
          <span
            style={{
              fontSize: "21px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Details:
          </span>
          <span>coupon details</span>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
        <div className="voucher-procedure-detail-price">
          <div
            style={{ fontWeight: "600", fontSize: "16px", marginLeft: "130px" }}
          >
            Price Details:
          </div>
          <div
            style={{ fontWeight: "400", fontSize: "14px", marginLeft: "300px" }}
          >
            Origin Price: $89
          </div>
          <div
            style={{
              fontWeight: "700",
              fontSize: "21px",
              marginLeft: "130px",
              background: "linear-gradient(90deg, #F48C8A 0%, #F0A484 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline", // This might be necessary for the gradient to apply correctly
            }}
          >
            $69 with Promotion
          </div>
          <div
            style={{
              fontWeight: "400",
              fontSize: "14px",
              marginLeft: "330px",
              color: "pink",
            }}
          >
            12 hours left
          </div>
          <div className="voucher-procedure-detail-price-button">
            <button className="voucher-pink-button">edit</button>
            <button>
              <img
                src={deteleIcon}
                style={{ width: "42px", height: "42px" }}
              ></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorEditVoucherSession;
