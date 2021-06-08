import React, { useRef, useState } from "react";
import styled from "styled-components";

interface Props {
    src: string | undefined;
    back: () => void;
}
const Uploaded = ({ src, back }: Props) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const imageLinkRef = useRef<any>();

    const copyText = () => {
        if (imageLinkRef.current) {
            imageLinkRef.current.select();
            imageLinkRef.current.setSelectionRange(0, 99999);
            document.execCommand("copy");
            setShowTooltip(true);
            setInterval(() => {
                setShowTooltip(false);
            }, 5000);
            imageLinkRef.current.blur();
        }
    };

    return (
        <StyledDiv className="Upload-success">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="upload-new"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={back}
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                />
            </svg>
            <div className="success-icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <h2 className="title">Uploaded Successfully!</h2>
            <img src={src} alt="..." className="image-preview" />
            <div className="link">
                <input
                    className="text"
                    type="text"
                    ref={imageLinkRef}
                    defaultValue={src}
                    readOnly
                />
                <button onClick={copyText}>Copy Link</button>
                <TooltipStyle shown={showTooltip}>Copied!</TooltipStyle>
            </div>
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    .upload-new {
        display: block;
        position: absolute;
        width: 40px;
        height: 40px;
        color: var(--blue1);
        cursor: pointer;
        border-radius: 50%;
        top: 0;
        left: 50%;
        transform: translate(-50%, 20px);
        &:hover {
            box-shadow: var(--shadow);
        }
    }
    .success-icon {
        --icon-size: 40px;
        width: var(--icon-size);
        height: var(--icon-size);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 12px;
        background: var(--green1);
        color: var(--white);
        svg {
            width: 30px;
            height: 30px;
        }
    }
    .title {
        color: var(--gray2);
        margin-bottom: 24px;
    }
    .image-preview {
        display: block;
        overflow: hidden;
        border-radius: var(--radius);
        margin-bottom: 24px;
        width: 100%;
        max-width: 400px;
        height: 248px;
        object-fit: cover;
        object-position: center;
        background: var(--border-color);
    }
    .link {
        position: relative;
        --radius: 12px;
        border-radius: var(--radius);
        width: 100%;
        display: flex;
        gap: 14px;
        border: 1px solid var(--border-color);
        background: var(--dragndrop-bg);
        padding: 2px;
        font-family: "Poppins", sans-serif;
        > .text {
            font-family: inherit;
            font-size: inherit;
            border: none;
            background: none;
            color: var(--gray2);
            margin: 11px 0;
            margin-left: 6px;
            font-size: 12px;
            width: 240px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:focus {
                outline: none;
            }
        }
        > button {
            background: var(--blue1);
            color: var(--white);
            border: none;
            border-radius: var(--radius);
            padding: 0 18px;
            font-family: inherit;
            &:focus {
                outline: none;
            }
        }
    }
`;
type TooltipProps = {
    shown: boolean;
};
const TooltipStyle = styled.div<TooltipProps>`
    padding: 8px 16px;
    border-radius: var(--radius);
    color: var(--white);
    background: var(--gray2);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 4px);
    ${props => (props.shown ? "display: block;" : "display: none;")}
`;

export default Uploaded;
