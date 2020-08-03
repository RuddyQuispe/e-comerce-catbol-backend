create or replace function register_user(username_i text, email_i text, rol_description_i text)returns integer as 
$BODY$
declare exists_email integer = (select count(*) from "user" where email=email_i);
		id_user integer;
begin 
	if (exists_email=0) then
		insert into "user"(username, rol_description, status, email) values (username_i, rol_description_i, true, email_i) returning id into id_user;
		return id_user;
	else
		return -1;
	end if;
end $BODY$ language plpgsql;

create or replace function register_provider(ci_nit_i integer, name_i text, phone_i text, address_i text, email_i text)returns boolean as 
$BODY$
declare exists_provider integer = (select count(*) from provider where ci_nit=ci_nit_i limit 1);
begin 
	if (exists_provider=0) then
		insert into provider (ci_nit, "name", phone, address, email) values (ci_nit_i, name_i, phone_i, address_i, email_i);
		return true;
	else
		return false;
	end if;
end; $BODY$ language plpgsql;

create or replace function register_note(description_i text, date_note_i date, id_user_i integer, id_provider_i integer)returns integer as 
$BODY$
declare enable_user boolean = (select status from "user" where id=id_user_i);
	no_note integer;
begin 
	if (enable_user) then
		insert into entry_note(description, date_note, id_user, id_provider) values (description_i, date_note_i, id_user_i, id_provider_i) returning no_entry into no_note;
		return no_note;
	else
		return -1;
	end if;
end; $BODY$ language plpgsql;

create or replace function register_detail_note(no_entry_i integer, id_tail_i smallint, code_clothing_i integer) returns boolean as 
$BODY$
declare enable_clothing boolean = (select estatus from clothing where code_clothing=code_clothing_i);
		is_group_clothing integer = (select count(*) from clothing_group where code_clothing_super=code_clothing_i);
		id_detail_r integer;
begin 
	if (enable_clothing and is_group_clothing=0) then
		insert into entry_detail(no_entry, id_tail, code_clothing) values (no_entry_i, id_tail_i, code_clothing_i) returning id_detail into id_detail_r;
		return id_detail_r;
	else
		return -1;
	end if;
end $BODY$ language plpgsql;

create or replace function register_clothing(description_i text, image_name_i text, characterists_i text, color_i text)returns integer as 
$BODY$
declare cod integer;
begin 
	insert into clothing(description, image_name, characterists, color, estatus) values (description_i, image_name_i, characterists_i, color_i, true) returning code_clothing into cod;
	return cod;
end $BODY$ language plpgsql;

create or replace function register_size(description_i text)returns smallint as
$BODY$
declare code smallint;
begin 
	insert into "size"(description) values (description_i) returning id into code;
	return code;
end $BODY$ language plpgsql;

create or replace function register_size_clothes(id_size_i smallint, code_clothing_i integer, price_i decimal(12,2), discount_i decimal(12,2))returns boolean as 
$BODY$e
begin 
	if (discount_i<100 and price_i>0) then 
		insert into size_clothes(id_size, code_clothing, price, discount, stock) values (id_size_i, code_clothing_i, price_i, discount_i, 0);
		return true;
	else 
		return false;
	end if;
end $BODY$ language plpgsql;

create or replace function register_cloting_group(code_clothing_super_i integer, code_clothing_sub_i integer, quantity_i smallint )returns boolean as
$BODY$
begin 
	if (code_clothing_super_i<>code_clothing_sub_i) then 
		insert into clothing_group(code_clothing_super, code_clothing_sub, quantity) values (code_clothing_super_i, code_clothing_sub_i, quantity_i);
		return true;
	else 
		return false;
	end if;
end $BODY$ language plpgsql;

create or replace function register_category(name_i text, description_i text, type_i boolean, status_i boolean)returns integer as 
$BODY$
declare exists_name integer = (select count(*) from category where "name"=name_i);
		id smallint;
begin 
	if (exists_name=0) then
		insert into category("name", description, "type", status) values (name_i, description_i, type_i, status_i) returning id_category into id;
		return id;
	else
		return -1;
	end if;
end $BODY$ language plpgsql;

create or replace function register_sub_category(id_category_super_i smallint, id_category_sub_i smallint) returns boolean as
$BODY$
begin 
	if (id_category_super_i<>id_category_sub_i)then 
		insert into super_category(id_category_super, id_category_sub) values (id_category_super_i, id_category_sub_i);
		return true;
	else
		return false;
	end if;
end $BODY$ language plpgsql;

create or replace function register_new_cupon(limit_date_i date, discount_i decimal(12,2))returns smallint as 
$BODY$
declare code smallint;
begin 
	if (now()<limit_date_i and discount_i<100) then 
		insert into coupon(limit_date, discount) values (limit_date_i, discount_i) returning coupon_code into code;
		return code;
	else
		return -1;
	end if;
end $BODY$ language plpgsql;

create or replace function register_user_client(ci_i integer, first_name_i text, last_name_i text, email_i text, phone_i text, address_i text, province_i text, city_i text) returns boolean as 
$BODY$
declare exists_ci integer = (select count(*) from client_user where ci=ci_i);
		exists_email integer = (select count(*) from client_user where email=email_i);
begin 
	if (exists_ci=0 and exists_email=0) then 
		insert into client_user(ci, first_name, last_name, email, phone, address, province, city, status) values 
					(ci_i, first_name_i, last_name_i, email_i, phone_i, address_i, province_i, city_i, true);
		return true;
	else
		return false;
	end if;
end $BODY$ language plpgsql;

create or replace function get_coupon(ci_client_user_i integer, coupon_code_i smallint) returns boolean as
$BODY$
declare date_coupon date = (select limit_date from coupon where coupon_code=coupon_code_i);
begin 
	if (now()<date_coupon) then
		insert into coupon_list(ci_client_user, coupon_code) values (ci_client_user_i, coupon_code_i);
		return true;
	else
		return false;
	end if;
end $BODY$ language plpgsql;

create or replace function create_shopping_cart(ci_i integer)returns integer as 
$BODY$
declare code_shopping integer;
begin 
	insert into shopping_cart(date_shopping, ci) values (now(), ci_i) returning id_shopping_cart into code_shopping;
	return code_shopping;
end $BODY$ language plpgsql;

create or replace function add_clothing_to_shopping_cart(code_clothing_i integer, id_size_i smallint, id_shopping_cart_i integer, quantity_i smallint)returns boolean as 
$BODY$
declare enable_clothing boolean = (select estatus from clothing where code_clothing=code_clothing_i);
		stock_available smallint = (select stock from size_clothes where code_clothing=code_clothing_i and id_size=id_size_i);
		discount_g decimal(12,2) = (select discount from size_clothes where id_size=id_size_i and code_clothing=code_clothing_i);
		price_g decimal(12,2) = (select price from size_clothes where id_size=id_size_i and code_clothing=code_clothing_i);
		cost_subtotal decimal(12,2);
begin 
	if (enable_clothing and stock_available>=quantity_i) then 
		cost_subtotal = price_g*quantity_i;
		cost_subtotal = (cost_subtotal/100)*discount_g;
		insert into shopping_list(code_clothing, id_size, id_shopping_cart, quantity, subtotal) values (code_clothing_i, id_size_i, id_shopping_cart_i, quantity_i, price_g-cost_subtotal);
		return true;
	else
		return false;
	end if;
end $BODY$ language plpgsql;

create or replace function register_delivery(name_i text, movil_description_i text)returns smallint as
$BODY$
declare id_delivery smallint;
		exists_delivery integer = (select count(*) from delivery_staff where "name"=name_i);
begin 
	if (exists_delivery=0) then
		insert into delivery_staff("name", movil_description) values (name_i, movil_description_i) returning code_delivery into id_delivery;
		return id_delivery;
	else
		return -1;
	end if;
end $BODY$ language plpgsql;

create or replace function register_sale_note(address_send_i text, no_home_i smallint, province_i text, city_i text, payment_type_i boolean, id_user_i integer, id_shopping_cart_i integer, code_delivery_i smallint)returns integer as 
$BODY$
declare code integer;
begin 
	insert into sale_note(address_send, no_home, province, city, status_sale, payment_type, id_user, id_shopping_cart, code_delivery) values 
						(address_send_i, no_home_i, province_i, city_i, false, payment_type_i, id_user_i, id_shopping_cart_i, code_delivery_i) returning code_sale into code;
	return code;
end $BODY$ language plpgsql;

create or replace function get_discount_last_coupon(ci_user_client integer)returns decimal(12,2) as
$BODY$
declare have_coupon integer = (select count(*) from coupon_list where ci_client_user=ci_user_client);
		date_last date;
		discount_g decimal(12,2);
begin
	if (have_coupon>0) then
		date_last = (select c.limit_date from coupon_list cl, coupon c where cl.coupon_code=c.coupon_code and cl.ci_client_user=ci_user_client order by c.limit_date desc);
		if (date_last>=now()) then
			discount_g = (select discount from coupon where limit_date=date_last limit 1);
			return discount_g;
		else
			return 0;
		end if;
	else
		return 0;
	end if;
end $BODY$ language plpgsql;

create or replace function register_invoice(code_sale_i integer)returns integer as 
$BODY$
declare total_cost_g decimal(12,2) = (select sum(sl.subtotal) from sale_note sn, shopping_cart sc, shopping_list sl where sn.id_shopping_cart=sc.id_shopping_cart and sc.id_shopping_cart=sl.id_shopping_cart);
		ci_client integer = (select sc2.ci from sale_note sn, shopping_cart sc2 where sc2.id_shopping_cart=sn.id_shopping_cart and sn.code_sale=code_sale_i);
		discount_g decimal(12,2) = get_discount_last_coupon(ci_client);
		iva decimal(12,2);
		no_invoice_g integer;
begin 
	total_cost_g = total_cost_g-discount_g;
	iva = (total_cost_g/100)*13;
	insert into invoice(total_cost, iva_tax, code_sale) values (total_cost_g, iva, code_sale_i) returning invoice_no into no_invoice_g;
	return no_invoice_g;
end $BODY$ language plpgsql;

create or replace function register_entry_detail() returns trigger as
$BODY$
begin 
	update size_clothes set stock=stock+new.quantity where code_clothing=new.code_clothing and id_size=new.id_tail;
	return new;
end $BODY$ language plpgsql;

create trigger entry_detail_register after insert 
on entry_detail
for each row
	execute procedure register_entry_detail();
	
create or replace function delete_entry_detail() returns trigger as
$BODY$
begin 
	update size_clothes set stock=stock-old.quantity where code_clothing=old.code_clothing and id_size=old.id_tail;
	return old;
end $BODY$ language plpgsql;

create trigger entry_detail_delete after delete 
on entry_detail
for each row
	execute procedure delete_entry_detail();
	
create or replace function add_shopping_cart() returns trigger as
$BODY$
begin 
	update size_clothes set stock=stock-new.quantity where code_clothing=new.code_clothing and id_size=new.id_size;
	raise notice 'Trigger';
	return new;
end $BODY$ language plpgsql;

create trigger shopping_cart_register after insert 
on shopping_list
for each row
	execute procedure add_shopping_cart();
	
create or replace function delete_shopping_cart() returns trigger as
$BODY$
begin 
	update size_clothes set stock=stock-old.quantity where code_clothing=old.code_clothing and id_size=old.id_size;
	return old;
end $BODY$ language plpgsql;

create trigger shopping_cart_delete after delete 
on shopping_list
for each row
	execute procedure delete_shopping_cart();

create or replace function getIdUser(email_v text)returns integer as 
$BODY$
declare isUser integer = (select count(*) from "user" where email=email_v);
		isUserClient integer = (select count(*) from client_user where email=email_v);
		id_r integer;
begin 
	if(isuser >0) then
		id_r = (select id from "user" where email=email_v limit 1);
		return id_r;
	else if (isUserClient>0) then
			id_r = (select ci from client_user where email=email_v limit 1);
			return id_r;
		 else
			return -1;
		 end if;
	end if;
end $BODY$ language plpgsql;