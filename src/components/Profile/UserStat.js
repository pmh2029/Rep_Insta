
const UserStat = ({ userUID }) => {
    // return (
    //     <div>
    //         {userUID}
    //     </div>
    // );
    console.log(userUID);
    return (
        <div className="container mx-auto md:max-w-screen-md lg:max-w-screen-lg flex items-center justify-between py-3">
            <h1>HEllo {userUID.username}</h1>
        </div>
    );
}

export default UserStat;