import ('../../styles/partials/OutcomeBanner.css');

export default function OutcomeBanner({outcome = null}) {
    if (outcome) {
            return (
                <div className = {outcome.success ? 'outcome-banner outcome-banner-success' : 'outcome-banner outcome-banner-fail'}>
                    {outcome.message}
                </div>
            )
        }
        return <></>
}