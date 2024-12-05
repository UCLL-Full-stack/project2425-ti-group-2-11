const loginTable: React.FC = () => {
    return (
        <>
            <table className="mb-3" style={{ borderCollapse: 'separate', borderSpacing: '10px', border: '1px solid black'}}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody className="mb-3">
                    <tr>
                        <td>chris.brown@domain.com</td>
                        <td>AnotherSecurePassword</td>
                        <td>User</td>
                    </tr>
                    <tr>
                        <td>jhon@iets.be</td>
                        <td>XX</td>
                        <td>Owner</td>
                    </tr>
                    <tr>
                        <td>emily.white@domain.com</td>
                        <td>SuperSecretPassword</td>
                        <td>Amin</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default loginTable;