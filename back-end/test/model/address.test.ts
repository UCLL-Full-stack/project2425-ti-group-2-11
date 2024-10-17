import exp from "constants";
import { Address } from "../../model/address"

const VALID_STREET = 'Bondgenotenlaan';
const VALID_CITY = 'Leuven';
const VALID_STATE = 'Leuven';
const VALID_POSTALCODE = '3000';
const VALID_COUNTRY = 'Belgium';


test('given: valid address info, when: creating address, then: address is created', () => {
    const address = new Address({ street: VALID_STREET, city: VALID_CITY, state: VALID_STATE, postalCode: VALID_POSTALCODE, country: VALID_COUNTRY })

    expect(address.getStreet()).toEqual(VALID_STREET);
    expect(address.getCity()).toEqual(VALID_CITY);
    expect(address.getState()).toEqual(VALID_STATE);
    expect(address.getPostalCode()).toEqual(VALID_POSTALCODE);
    expect(address.getCountry()).toEqual(VALID_COUNTRY);
});

test('given: two identical addresses, when: asking if equal, then: true is returned', () => {
    const address1 = new Address({ street: VALID_STREET, city: VALID_CITY, state: VALID_STATE, postalCode: VALID_POSTALCODE, country: VALID_COUNTRY })
    const address2 = new Address({ street: VALID_STREET, city: VALID_CITY, state: VALID_STATE, postalCode: VALID_POSTALCODE, country: VALID_COUNTRY })

    expect(address1.equals(address2)).toBe(true);
})