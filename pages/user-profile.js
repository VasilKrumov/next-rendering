export default function UserProfile(props) {
    return (
        <div>
            <h1>{props.userName}</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { params, req, res } = context

    return {
        props: {
            userName: 'Vasil',
        },
    }
}
