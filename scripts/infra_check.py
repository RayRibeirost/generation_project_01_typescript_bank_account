import sys
import json
import boto3
from botocore.exceptions import ClientError, NoCredentialsError

REGION = "us-east-1"
PROJECT = "bank-account"

def get_clients():
    try:
        ec2 = boto3.client("ec2", region_name=REGION)
        rds = boto3.client("rds", region_name=REGION)
        return ec2, rds
    except NoCredentialsError:
        print("[ERROR] AWS credentials not founded.")
        print("Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.")
        sys.exit(1)

def check_ec2(ec2):
    print("\nChecking instance...")
    response = ec2.describe.instances(
        Filters=[
            {"Name": "tag:Name", "Values": [f"{PROJECT}-ec2"]},
            {"Name": "instance-state-name", "Values": ["running", "pending", "stopped"]},
        ]
    )
    reservations = response.get("Reservations", [])
    if not reservations:
        print(f"[Fail] Any instance with tag Name={PROJECT}-ec2 was founded.")
        return False
    instance = reservations[0]["Instances"][0]
    state = instance["InstanceState"]["Name"]
    instace_id = instance["InstanceId"]
    public_ip = instance.get("PublicIpAddress", "No Public IP")
    print(f"Instance ID = {instace_id}")
    print(f"State: {state}")
    print(f"Public IP: {public_ip}")
    if state != "running":
        print(f"[FAIL] Instance is not running. State: {state}")
        return False
    print("[OK] EC2 running")
    return True

def check_rds(rds):
    print("\n[RDS] Checking database")
    try:
        response = rds.describe_db_instances(
            DBInstanceIdentifier=f"{PROJECT}-postgres"
        )
    except ClientError as e:
        if e.response["Error"]["Code"] == "DBInstanceNotFound":
            print(f"[FAIL] RDS {PROJECT}-postgres not founded.")
            return False
        raise
    db = response["DBInstances"][0]
    status = db["DBInstanceStatus"]
    endpoint = db.get("Endpoint", {}).get("Address", "no endpoint")
    engine = db["Engine"]
    engine_version = db["Engine_Version"]
    print(f"Identifier:{db['DBInstanceIdentifier']}")
    print(f"Engine:{engine} {engine_version}")
    print(f"Status: {status}")
    print(f"Endpoint:{endpoint}")
    if status != "available":
        print(f"[FAIL] RDS is not available. Status: {status}")
        return False
    print("[OK] RDS available")
    return True

def check_security_groups(ec2):
    print("\n Checking Security Groups Rules")
    response = ec2.describe_security_groups(
        Filters = [
            {"Name": "tag:Name", "Values": [
                f"{PROJECT}-sg-ec2",
                f"{PROJECT}-sg-rds"
            ]}
        ]
    )
    sgs = response.get("SecurityGroups", [])
    if len(sgs) < 2:
        print(f"[FAIL] 2 Security Groups Expected, founded {len(sgs)}.")
        return False
    for sg in sgs:
        name = next(
            (t["Value"] for t in sg.get("Tags", []) if t["Key"] == "Name"),
            sg["GroupId"]
        )
        inbound_ports = [
            rule.get("FromPort")
            for rule in sg.get("IpPermissions", [])
        ]
        print(f"SG: {name} | Inbound Ports: {inbound_ports}")
    print("[OK] Security Groups founded")
    return True

def check_vpc(ec2):
    print("\n[VPC] Checking Network...")
    response = ec2.describe_vpcs(
        Filters = [
            {"Name": "tag:Name", "Values": [f"{PROJECT}-vpc"]},
            {"Name": "state", "Values": ["available"]}
        ]
    )
    vpcs = response.get("Vpcs", [])
    if not vpcs:
        print(f"[Fail] VPC {PROJECT}-vpc not founded")
        return False
    vpc = vpcs[0]
    print(f"VPC IP: {vpc['VpcId']}")
    print(f"CIDR: {vpc['CidrBlock']}")
    print(f"[OK] VPC available")
    return True

def main():
    print("=" * 55)
    print(f"Bank Account - AWS Infrastructure Validation")
    print(f"Project: {PROJECT}")
    print(f"Region: {REGION}")
    print("=" * 55)

    ec2, rds = get_clients()
    results = {
        "vpc": check_vpc(ec2),
        "ec2": check_ec2(ec2),
        "rds": check_rds(rds),
        "security_groups": check_security_groups(ec2),
    }
    print("\n" + "=" * 55)
    print("Final Result")
    print("=" * 55)
    all_ok = True
    for resource, status in results.items():
        icon = "[OK]" if status else "[FAIL]"
        print(f"{icon} {resource.upper()}")
        if not status:
            all_ok = False
    print("=" * 55)
    if all_ok:
        print("\n Validated Infrastructure. The deloy can proceed.")
        sys.exit(0)
    else:
        print("\n Validation Failed. Check the resources above.")
        sys.exit(1)

if __name__ == "__main__":
    main()