import { Customer, CustomerAccount } from 'db-utilities/lib/models';

export const saveCustomer = async (arr) => {
    const customer = await Customer();
    const customerArr = arr.map(res => res)
        .map((res) => {
            const [
                id,
                bp_number,
                english_name,
                chinese_name,
                rate_category,
                address_floor,
                address_room,
                address_street_3,
                address_street_2,
                address_house_number,
                address_street,
                address_district,
                address_region,
                currency,
                company_name,
                email,
                mobile,
                billing_address,
                language_preference,
            ] = res;
            return {
                id,
                customer_id: id,
                bp_number,
                english_name,
                chinese_name,
                rate_category,
                address_floor,
                address_room,
                address_street_3,
                address_street_2,
                address_house_number,
                address_street,
                address_district,
                address_region,
                currency,
                company_name,
                email,
                mobile,
                billing_address,
                language_preference,
            };
        });
    customer.bulkCreate(customerArr);
};

export const saveCustomerAccount = async (arr) => {
    const customerAccount = await CustomerAccount();
    const account = arr.map(res => res)
        .map((res, index) => {
            const [
                deletion_indicator,
                business_partner_no,
                account_class,
                trade_class,
                language,
                account_activity_indicator,
                rate_category,
                address_street_2,
                premise_no,
                premise_type,
                move_out_date,
                connection_object,
                meter_no,
                installation,
                premise_function,
            ] = res;

            return {
                customer_id: index + 1,
                deletion_indicator,
                business_partner_no,
                account_class,
                trade_class,
                language,
                account_activity_indicator,
                rate_category,
                address_street_2,
                premise_no,
                premise_type,
                move_out_date,
                connection_object,
                meter_no,
                installation,
                premise_function,
            };
        });
    customerAccount.bulkCreate(account);
};
