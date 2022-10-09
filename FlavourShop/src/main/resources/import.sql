insert into ROLE(name_role) values ('admin');
insert into ROLE(name_role) values ('user');

insert into USER_TABLE(username, name, password, id_role) values ('iepang', 'Georgiana', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', 1);
insert into USER_TABLE(username, name, password, id_role, enabled) values ('Admin123', 'Admin', '$2a$10$Vjiy4OJ4.xVAI3U6h31snuJr0nVHzU1cX4H/SzeEi2E7qr4zBvLBG', 1, 1);
insert into USER_TABLE(username, PHONE_NUMBER,  name, password, id_role, enabled) values ('User1234', '0712345678',  'User', '$2a$10$O9idl6lRmSF7.41soFyzRejBQQadnrZLL1xwOJUnCIah.cl8c9V1.', 2,1);

insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (10, 'Soap', 100, 'Flavor Soap gives sensitive skin that wonderful clean sensation it deserves. It works in harmony with the natural PH of the skin and the level of hydration to remove the sensation of "tight" skin and the discomfort caused by its drying: 100 g',1);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (15, 'Shower gel', 100, 'Suitable for all skin types, the shower gel leaves the skin soft, clean and hydrated, the foam transforming from a light gel texture into a super-fine foam: 500 ml', 1);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (25, 'Shampoo', 100, 'Give love to dry hair prone to breakage with the help of our intense repairing shampoo Flavor. Our shampoo strengthens the hair and reduces its breakage. It leaves dry hair looking hydrated and feeling healthier, fresher and intensely nourished: 750 ml', 1);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (20, 'Body lotion', 100, 'Our Flavor moisturizing lotion helps protect skin against dryness, offering 72 hours of hydration for skin that feels instantly smoother. This lotion helps you enjoy smoother skin, which looks healthier and feels hydrated: 300 ml', 1);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (10, 'Hand cream', 100, 'Keep your hands dry, sensitive, soft, velvety and protected against dryness with our intensely moisturizing Flavor Hand Balm. Our balm cares for nails and cuticles and nourishes dry, sensitive skin with 96 hours of hydration: 100 ml', 1);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (20, 'Body spray', 100, 'Smell irresistible with our Flavor body spray, with an improved formula. Our spray leaves the skin instantly refreshed and smelling of ripe mango from head to toe: 250 ml', 1);

insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (30, 'Body butter', 100, 'Love, soothe and nourish dry, sensitive skin like never before with the best nourishing Flavor body butter ever. It leaves the skin feeling smoother, smoother and nourished with 96 hours of hydration.', 1);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (25, 'Hair balm', 100, 'Restore the shine of dull hair with the Flavor conditioner for shine and protection. Our conditioner leaves dull hair looking shiny and more radiant, protecting it against daily pollution: 750 ml', 1);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (35, 'Body oil', 100, 'Provides intense hydration to very dry skin with our Flavor nourishing body oil. Spray a thin layer of body oil. Quickly absorbed and non-sticky, it leaves gray skin radiant with a natural,healthy-looking glow.', 1);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (12, 'Bath bomb', 100, 'Pamper yourself with our Flavor aromas and color your bathroom: 200 g', 1);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (15, 'Lip balm', 100, 'Moisturize the lips in a single application with our new balm intensely hydrating Flavour. Apply our on-the-go lip savior for lips that feel soft and hydrated with a subtle shine.', 0);
insert into PRODUCT(PRICE_PRODUCT, NAME_PRODUCT, STOCK_PRODUCT, DESCRIPTION,ACTIVE_PRODUCT) values (40, 'Body scrub', 100, 'Gently exfoliate that wonderful body with our Flavor scrub. Made with ingredients of natural origin, the creamy scrub removes dead skin cells leaving it feeling soft and smooth: 750 g', 0);

insert into INGREDIENT(PRICE_INGREDIENT, NAME_INGREDIENT) values (5, 'Coconut');
insert into INGREDIENT(PRICE_INGREDIENT, NAME_INGREDIENT) values (5, 'Olive');
insert into INGREDIENT(PRICE_INGREDIENT, NAME_INGREDIENT) values (5, 'Orange');
insert into INGREDIENT(PRICE_INGREDIENT, NAME_INGREDIENT) values (5, 'Lemon');
insert into INGREDIENT(PRICE_INGREDIENT, NAME_INGREDIENT) values (5, 'Argan');
insert into INGREDIENT(PRICE_INGREDIENT, NAME_INGREDIENT) values (5, 'Aloe vera');
insert into INGREDIENT(PRICE_INGREDIENT, NAME_INGREDIENT) values (5, 'Mint');
insert into INGREDIENT(PRICE_INGREDIENT, NAME_INGREDIENT) values (5, 'Tea tree');

insert into ORDER_TABLE(ID_USER, ADDRESS) values (1, 'Str BlaBla 1');
insert into ORDER_TABLE(ID_USER, ADDRESS) values (1, 'Str BlaBla 1');

insert into ORDER_PRODUCT(ID_ORDER, ID_PRODUCT, QUANTITY_ORDER_PRODUCT) values (1, 1, 1);
insert into ORDER_PRODUCT(ID_ORDER, ID_PRODUCT, QUANTITY_ORDER_PRODUCT) values (1, 2, 1);
insert into ORDER_PRODUCT(ID_ORDER, ID_PRODUCT, QUANTITY_ORDER_PRODUCT) values (2, 2, 5);

insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 1, 5);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 1, 4);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 1, 3);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 1, 4);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 1, 5);

insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 2, 5);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 2, 4);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 2, 3);

insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 3, 4);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 3, 5);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 3, 5);

insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 4, 4);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 4, 3);
insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 4, 4);

insert into REVIEW(ID_USER, ID_PRODUCT, RATING) values (2, 5, 5);




