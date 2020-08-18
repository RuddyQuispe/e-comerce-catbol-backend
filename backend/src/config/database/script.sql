create table "user" (
	id serial primary key,
	username text not null,
	email text not null,
	rol_description text not null,
	status boolean not null
);

create table provider(
	ci_nit integer not null primary key,
	name text not null,
	phone text not null,
	address text not null,
	email text not null
);

create table entry_note(
	no_entry serial primary key,
	description text not null,
	date_note date not null default now(),
	id_user integer not null,
	id_provider integer not null,
	foreign key (id_user) references "user"(id)
	on update cascade
	on delete cascade,
	foreign key (id_provider) references provider(ci_nit)
	on update cascade 
	on delete cascade
);

create table clothing(
	code_clothing serial primary key,
	description text not null,
	image_name text not null,
	characterists text not null,
	color text not null,
	estatus boolean not null
);

create table clothing_group(
	code_clothing_super integer not null,
	code_clothing_sub integer not null,
	quantity smallint not null,
	primary key (code_clothing_super, code_clothing_sub),
	foreign key (code_clothing_super) references clothing(code_clothing),
	foreign key (code_clothing_sub) references clothing(code_clothing)
);


create table entry_detail(
	no_entry integer references entry_note
	on update cascade
	on delete cascade,
	id_detail serial not null,
	id_tail smallint not null,
	code_clothing integer references clothing
	on update cascade
	on delete cascade,
	quantity smallint not null,
	primary key (no_entry, id_detail)
);

create table size(
	id smallserial primary key,
	description text not null
);

create table size_clothes(
	id_size smallint not null,
	code_clothing integer references clothing
	on update cascade
	on delete cascade,
	price decimal(12,2) not null,
	discount decimal(12,2) not null,
	stock smallint not null,
	primary key (code_clothing, id_size),
	foreign key(id_size) references size(id)
	on update cascade 
	on delete cascade
);

create table category(
	id_category smallserial primary key,
	name text not null,
	description text not null,
	type boolean not null,			-- true: category false: promo
	status boolean not null
);

create table clothes_category(
	code_clothing integer references clothing
	on update cascade
	on delete cascade,
	id_category integer references category
	on update cascade
	on delete cascade,
	primary key (id_category, code_clothing)
);

create table coupon(
	coupon_code smallserial primary key,
	limit_date date not null,
	discount decimal(12,2) not null
);

create table client_user(
	ci integer not null primary key,
	first_name text not null,
	last_name text not null,
	emaIL text not null,
	phone text not null,
	address text not null,
	province text not null,
	city text not null,
	status boolean not null
);

create table coupon_list(
	ci_client_user integer not null,
	coupon_code smallint references coupon
	on update cascade
	on delete cascade,
	primary key (ci_client_user, coupon_code),
	foreign key (ci_client_user) references client_user(ci)
	on update cascade
	on delete cascade
);

create table shopping_cart(
	id_shopping_cart serial primary key,
	date_shopping date not null,
	ci integer references client_user
	on update cascade
	on delete cascade
);

create table shopping_list(
	code_clothing integer not null,
	id_size smallint not null,
	id_shopping_cart integer references shopping_cart
	on update cascade
	on delete cascade,
	quantity smallint not null,
	subtotal decimal(12,2) not null,
	primary key (code_clothing, id_shopping_cart, id_size),
	foreign key (code_clothing, id_size) references size_clothes(code_clothing, id_size)
	on update cascade
	on delete cascade
);

create table delivery_staff(
	code_delivery smallserial primary key,
	name text not null,
	movil_description text not null
);

create table sale_note(
	code_sale serial primary key,
	address_send text not null,
	no_home smallint not null,
	province text not null,
	city text not null,
	status_sale boolean not null,		--true: completed : false : in process
	payment_type boolean not null,			--true: web : false delivery time
	id_user integer null,
	corporate text not null,
	nit text not null,
	code_delivery smallint null,
	person_receive text not null,
	foreign key (id_user) references "user"(id)
	on update cascade
	on delete cascade,
	id_shopping_cart integer references shopping_cart
	on update cascade 
	on delete cascade,
	foreign key (code_delivery) references delivery_staff(code_delivery)
	on update cascade 
	on delete cascade
);

create table invoice(
	invoice_no serial primary key,
	total_cost decimal(12,2) not null,
	send_cost decimal(12,2) not null,
	iva_tax decimal(12,2) not null,
	code_sale integer references sale_note
	on update cascade
	on delete cascade
);

/** POBLACION **/
select register_user('master', 'master@gmailcom', 'admin');

select register_provider(12345678, 'juan miguel saracho', '12345678', 'La salle C. landivar #22', 'el_proveedor@gmail.com');

select register_note('ingreso primera semana de julio', cast(now() as date), 1, 12345678);

select register_clothing('T-Shirt Cuello V Bomber Amarillo', 'imagen_polera.jpg', 'Hombros caídos\nRemates de canalé\nInterior ligeramente cardado\nLargo de espalda en la talla M aprox. 72 cm', 'amarillo');
select register_clothing('Camiseta funcional', 'imagen_polera.jpg', 'Producto a juego:2090290 - Leggings funcionales,Producto a juego: 2090355 - Top funcional,Aplique calado en los hombros,Detalle reflectante en la espalda,Largo de espalda en la talla S aprox. 61 cm', 'Azul/Blanco');
select register_clothing('Camiseta de manga larga - Algodón orgánico', 'imagen_polera.jpg', 'Remates con costura doble', 'Azul oscuro');
select register_clothing('Pantalón - Slim Fit', 'imagen_polera.jpg', 'Cinturilla con trabillas para el cinturón, botón y cremallera,Estilo de 5 bolsillos,Largo interior de pernera en la talla 32/32 aprox. 82 cm,Ancho de dobladillo en la talla 32/32 aprox. 34 cm', 'caqui');
select register_clothing('Camiseta de manga corta - Algodón orgánico', 'imagen_polera.jpg', 'Parche con el logotipo en el dobladillo','Blanco');
select register_clothing('Vestido', 'imagen_polera.jpg', 'Aplicación fruncida por detrás de tejido elástico', 'Fucsia');
select register_clothing('Juego para niños', 'imagen_polera.jpg', 'Ropa para fiestas', 'Blanco y Azul');

select register_size('L');
select register_size('M');
select register_size('S');
select register_size('XL');
select register_size('P');
select register_size('XXL');

select register_cloting_group(1, 4, cast(5 as smallint));
select register_cloting_group(1, 5, cast(5 as smallint));

select register_category('Varones', 'Ropa para varones', true, true);
select register_category('Damas', 'Ropa para mujeres', true, true);
select register_category('Black Friday', 'Ofertas desde 20% hasta 70% de descuento', false, true);

select register_new_cupon('30-08-2020', cast(20 as decimal(12,2)));

select register_user_client(87654321, 'Joaquin', 'Chumacero', 'joaquin@gmailcom', '12345678', 'Los Tusequis C. Los andes #23', 'Warnes', 'Warnes');

select get_coupon(87654321, cast(1 as smallint));

select create_shopping_cart(87654321);

select register_size_clothes(cast(1 as smallint), 1, cast(58 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(2 as smallint), 1, cast(58 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(3 as smallint), 1, cast(58 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(1 as smallint), 2, cast(60 as decimal(12,2)), cast(10 as decimal(12,2)));
select register_size_clothes(cast(3 as smallint), 2, cast(50 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(4 as smallint), 2, cast(60 as decimal(12,2)), cast(10 as decimal(12,2)));
select register_size_clothes(cast(2 as smallint), 3, cast(100 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(4 as smallint), 3, cast(100 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(1 as smallint), 4, cast(150 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(1 as smallint), 5, cast(75 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(2 as smallint), 5, cast(75 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(3 as smallint), 6, cast(200 as decimal(12,2)), cast(0 as decimal(12,2)));
select register_size_clothes(cast(5 as smallint), 7, cast(250 as decimal(12,2)), cast(10 as decimal(12,2)));
 
update size_clothes set stock=20

select add_clothing_to_shopping_cart(1, cast(1 as smallint), 1, cast(1 as smallint));
select add_clothing_to_shopping_cart(2, cast(1 as smallint), 1, cast(2 as smallint));
select add_clothing_to_shopping_cart(5, cast(2 as smallint), 1, cast(1 as smallint));

select register_delivery('Joan Mosquera', 'Motocicleta Yamaha color Verde, placa EUS-1234');

select register_sale_note('Los tusequis, c. los andes #223', cast(223 as smallint), 'warnes', 'warnes', true, 1, 1, cast(1 as smallint));

select register_invoice(1);