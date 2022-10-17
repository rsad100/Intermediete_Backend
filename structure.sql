-- public.payments definition

-- Drop table

-- DROP TABLE public.payments;

CREATE TABLE public.payments (
	id_payment serial4 NOT NULL,
	"method" varchar NOT NULL,
	CONSTRAINT payments_pk PRIMARY KEY (id_payment)
);


-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE public.products (
	id_product int4 NOT NULL DEFAULT nextval('products_id_seq'::regclass),
	image_product varchar NOT NULL,
	name_product varchar NOT NULL,
	price int4 NOT NULL,
	desc_product varchar NOT NULL,
	"size" varchar NOT NULL,
	delivery varchar NOT NULL,
	starthours time NOT NULL,
	endhours time NOT NULL,
	stock int4 NOT NULL,
	category varchar NOT NULL,
	sold varchar NOT NULL,
	CONSTRAINT products_pk PRIMARY KEY (id_product)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id_user int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	phone_number varchar NOT NULL,
	"role" varchar NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id_user)
);


-- public.promos definition

-- Drop table

-- DROP TABLE public.promos;

CREATE TABLE public.promos (
	id_promo int4 NOT NULL DEFAULT nextval('promo_id_seq'::regclass),
	image_promo varchar NOT NULL,
	name_promo varchar NOT NULL,
	normal_price int4 NOT NULL,
	desc_promo varchar NOT NULL,
	product_size varchar NOT NULL,
	delivery varchar NOT NULL,
	discount varchar NOT NULL,
	start_date date NOT NULL,
	end_date date NOT NULL,
	code varchar NOT NULL,
	id_product int4 NOT NULL,
	CONSTRAINT promos_pk PRIMARY KEY (id_promo),
	CONSTRAINT fk_promos_product FOREIGN KEY (id_product) REFERENCES public.products(id_product)
);


-- public.transactions definition

-- Drop table

-- DROP TABLE public.transactions;

CREATE TABLE public.transactions (
	id_transaction int4 NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
	id_product int4 NOT NULL,
	amount int4 NOT NULL,
	id_user int4 NOT NULL,
	id_payment int4 NOT NULL,
	CONSTRAINT transactions_pk PRIMARY KEY (id_transaction),
	CONSTRAINT fk_orders_customers FOREIGN KEY (id_user) REFERENCES public.users(id_user),
	CONSTRAINT fk_transactions_payments FOREIGN KEY (id_payment) REFERENCES public.payments(id_payment),
	CONSTRAINT fk_transactions_product FOREIGN KEY (id_product) REFERENCES public.products(id_product)
);


-- public.userdata definition

-- Drop table

-- DROP TABLE public.userdata;

CREATE TABLE public.userdata (
	address varchar NULL,
	display_name varchar NULL,
	first_name varchar NULL,
	last_name varchar NULL,
	birthday varchar NULL,
	gender varchar NULL,
	image_user varchar NULL,
	id_user int4 NOT NULL,
	id_userdata serial4 NOT NULL,
	CONSTRAINT userdata_pkey PRIMARY KEY (id_userdata),
	CONSTRAINT fk_user_userdata FOREIGN KEY (id_user) REFERENCES public.users(id_user)
);