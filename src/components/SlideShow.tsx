import { useEffect, useState } from "react";
import { Product } from "../data/types";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { GoDotFill, GoDot } from "react-icons/go";

import { FaPlay } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { IoLink } from "react-icons/io5";
import { GoFileDirectoryFill } from "react-icons/go";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import useURLBlank from "../api/useURLBlank";
import { statusColors, statusExplenations, tags } from "../data/constants";

import ReactMK from "react-markdown";
import useMarkdown from "../api/useMarkdown";
import AsyncLoader from "./AsyncLoader";

export function SlideShow({ products }: { products: Product[] }) {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [popStatus, setPopStatus] = useState<number>(0);
    const [, setReload] = useState<number>(0);

    const forwardNav = () =>
        setSlideIndex((old) => (old + 1) % products.length);
    const backwardsNav = () =>
        setSlideIndex((old) => (old - 1 + products.length) % products.length);
    useEffect(() => {
        window.onresize = () => {
            setReload((old) => old + 1);
        };
        window.onkeydown = (e) => {
            switch (e.key) {
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    setSlideIndex((parseInt(e.key) - 1) % products.length);
                    break;
                case "ArrowRight":
                    forwardNav();
                    break;
                case "ArrowLeft":
                    backwardsNav();
                    break;
            }
        };
    });

    return (
        <>
            <main>
                <section
                    style={{
                        translate: `-${slideIndex * window.innerWidth}px 0%`,
                        width: window.innerWidth * products.length
                    }}
                >
                    {products.map((v) => (
                        <article style={{ width: window.innerWidth }}>
                            <main>
                                <p>@itaylayzer</p>
                                <div>
                                    <GoDotFill
                                        style={{
                                            marginBlock: "auto"
                                        }}
                                        color={statusColors[v.level]}
                                        data-tooltip-id="t"
                                        data-tooltip-content={
                                            statusExplenations[v.level]
                                        }
                                        size={25}
                                    />
                                    <h1>{v.title}</h1>

                                    {v.gameURI || v.markDown || v.github ? (
                                        <div className="buttons">
                                            {v.gameURI ? (
                                                <>
                                                    {v.playable === true ? (
                                                        <button
                                                            onClick={() =>
                                                                setPopStatus(1)
                                                            }
                                                        >
                                                            <FaPlay
                                                                color="white"
                                                                size={15}
                                                                style={{
                                                                    marginBlock:
                                                                        "auto"
                                                                }}
                                                                data-tooltip-id="t"
                                                                data-tooltip-content="Play Here"
                                                            />{" "}
                                                        </button>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            useURLBlank(
                                                                v.gameURI!
                                                            );
                                                        }}
                                                    >
                                                        <IoLink
                                                            color="white"
                                                            size={15}
                                                            style={{
                                                                marginBlock:
                                                                    "auto"
                                                            }}
                                                            data-tooltip-id="t"
                                                            data-tooltip-content="Play On Website"
                                                        />{" "}
                                                    </button>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            {v.gallery ? (
                                                <button
                                                    onClick={() =>
                                                        setPopStatus(2)
                                                    }
                                                >
                                                    <MdPhotoSizeSelectActual
                                                        color="white"
                                                        size={15}
                                                        style={{
                                                            marginBlock: "auto"
                                                        }}
                                                        data-tooltip-id="t"
                                                        data-tooltip-content="Gallery"
                                                    />
                                                </button>
                                            ) : (
                                                <></>
                                            )}
                                            {v.markDown ? (
                                                <button
                                                    onClick={() =>
                                                        setPopStatus(3)
                                                    }
                                                >
                                                    <MdArticle
                                                        color="white"
                                                        size={15}
                                                        style={{
                                                            marginBlock: "auto"
                                                        }}
                                                        data-tooltip-id="t"
                                                        data-tooltip-content="README.md"
                                                    />{" "}
                                                </button>
                                            ) : (
                                                <></>
                                            )}
                                            {v.github ? (
                                                <button
                                                    onClick={() => {
                                                        useURLBlank(v.github!);
                                                    }}
                                                >
                                                    <GoFileDirectoryFill
                                                        color="white"
                                                        size={15}
                                                        style={{
                                                            marginBlock: "auto"
                                                        }}
                                                        data-tooltip-id="t"
                                                        data-tooltip-content="Browse on Github"
                                                    />
                                                </button>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                {v.tags ? (
                                    tags
                                        .filter(
                                            (_, i) => ((v.tags! >> i) & 1) === 1
                                        )
                                        .map((t) => <p className="tag">{t}</p>)
                                ) : (
                                    <></>
                                )}
                            </main>
                        </article>
                    ))}
                </section>

                {products.length > 1 ? (
                    <div className="button">
                        <FaAngleLeft
                            onClick={(e) => {
                                e.preventDefault();
                                backwardsNav();
                            }}
                            onDoubleClick={(e) => {
                                e.preventDefault();
                            }}
                            style={{ marginBlock: "auto", cursor: "pointer" }}
                            color="white"
                            size={15}
                        />

                        {products.map((_, index) => {
                            const dot = [GoDot, GoDotFill][
                                +(index === slideIndex)
                            ];
                            return dot({
                                style: {
                                    marginBlock: "auto",
                                    cursor: "pointer"
                                },
                                color: "white",
                                size: 20,
                                onClick(e) {
                                    e.preventDefault();
                                    setSlideIndex(index);
                                },
                                onDoubleClick(e) {
                                    e.preventDefault();
                                }
                            });
                        })}
                        <FaAngleRight
                            onClick={(e) => {
                                e.preventDefault();
                                forwardNav();
                            }}
                            onDoubleClick={(e) => {
                                e.preventDefault();
                            }}
                            style={{ marginBlock: "auto", cursor: "pointer" }}
                            color="white"
                            size={15}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </main>
            <div className="pop" data-show={popStatus !== 0}>
                <header>
                    <h2>{["Play", "Gallery", "README.md"][popStatus - 1]}</h2>
                    <button onClick={() => setPopStatus(0)}>
                        <IoIosClose size={30} color="red" />
                    </button>
                </header>
                <main>
                    {
                        [
                            <iframe
                                src={products[slideIndex].gameURI!}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "0px",
                                    display: "block",
                                    zIndex: "10"
                                }}
                            ></iframe>,
                            <div className="gallery">
                                <center>
                                    {(
                                        (products[slideIndex].gallery ?? [
                                            [],
                                            []
                                        ])[0] ?? []
                                    ).map((v) => (
                                        <video controls>
                                            <source src={v} />
                                        </video>
                                    ))}

                                    {(
                                        (products[slideIndex].gallery ?? [
                                            [],
                                            []
                                        ])[1] ?? []
                                    ).map((v) => (
                                        <img src={v} />
                                    ))}
                                </center>
                            </div>,
                            <AsyncLoader
                                promise={useMarkdown(
                                    products[slideIndex].markDown!
                                )}
                                fThen={(data) => (
                                    <div className="react-mk">
                                        <ReactMK>{data}</ReactMK>
                                    </div>
                                )}
                                fCatch={(r) => <p>error {r.message}</p>}
                                meanwhile={
                                    <HiDotsHorizontal color="white" size={10} />
                                }
                            />
                        ][popStatus - 1]
                    }
                </main>
            </div>
        </>
    );
}
