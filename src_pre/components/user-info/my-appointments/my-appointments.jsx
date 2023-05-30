import { useState, useEffect } from 'react';
import './my-appointment.styles.scss';
import Card from './my-appointment-card/my-appointment-card.component';

function MyAppointment() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // 调用 API 获取卡片列表数据
        // fetch('https://www.charm-life.com/cards')
        //     .then((response) => response.json())
        //     .then((data) => setCards(data));
        setCards([{"title":"all", "content":"222"}])
    }, []);

    function handleCategoryClick(category) {
        // 根据所点击的元素调用 API 获取对应的卡片列表数据
        // fetch(`https://www.charm-life.com/cards?category=${category}`)
        //     .then((response) => response.json())
        //     .then((data) => setCards(data));
        setCards([{"title":category, "content":"222"}])
    }

    return (
        <div className="my-appointments">
            <div className="categories">
                <div onClick={() => handleCategoryClick('all')}>All</div>
                <div onClick={() => handleCategoryClick('waiting-for-treatment')}>
                    Waiting for Treatment
                </div>
                <div onClick={() => handleCategoryClick('waiting-for-review')}>
                    Waiting for Review
                </div>
                <div onClick={() => handleCategoryClick('reviewed')}>Reviewed</div>
            </div>
            <div className="cards">
                {cards.map((card) => (
                    <Card key={card.id} title={card.title} content={card.content} />
                ))}
            </div>
        </div>
    );
}

export default MyAppointment;
