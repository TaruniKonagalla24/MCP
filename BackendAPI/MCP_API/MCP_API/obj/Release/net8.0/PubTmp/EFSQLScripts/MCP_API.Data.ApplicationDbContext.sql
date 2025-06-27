IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250620110240_test'
)
BEGIN
    CREATE TABLE [Hackathons] (
        [Id] int NOT NULL IDENTITY,
        [HackathonId] int NOT NULL,
        [UserId] int NOT NULL,
        [Result] nvarchar(max) NOT NULL,
        [Answer] nvarchar(max) NOT NULL,
        [Score] float NOT NULL,
        [DateRegistered] datetime2 NOT NULL,
        [LastSubmission] datetime2 NOT NULL,
        CONSTRAINT [PK_Hackathons] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250620110240_test'
)
BEGIN
    CREATE TABLE [HackathonsMaster] (
        [Id] int NOT NULL IDENTITY,
        [Problem] nvarchar(max) NOT NULL,
        [TestCases] nvarchar(max) NOT NULL,
        [StartTime] datetime2 NOT NULL,
        [EndTime] datetime2 NOT NULL,
        [CreatedBy] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_HackathonsMaster] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250620110240_test'
)
BEGIN
    CREATE TABLE [Users] (
        [Id] int NOT NULL IDENTITY,
        [Username] nvarchar(max) NOT NULL,
        [Password] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [Role] nvarchar(max) NOT NULL,
        [Degree] nvarchar(max) NOT NULL,
        [Specialization] nvarchar(max) NOT NULL,
        [PhoneNumber] nvarchar(max) NOT NULL,
        [PhotoUrl] nvarchar(max) NULL,
        [Skills] nvarchar(max) NULL,
        [Experience] nvarchar(max) NULL,
        [AiRecommendations] nvarchar(max) NULL,
        [ProgrammingLanguagesKnown] nvarchar(max) NULL,
        [DateOfRegister] datetime2 NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250620110240_test'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AiRecommendations', N'DateOfRegister', N'Degree', N'Email', N'Experience', N'Password', N'PhoneNumber', N'PhotoUrl', N'ProgrammingLanguagesKnown', N'Role', N'Skills', N'Specialization', N'Username') AND [object_id] = OBJECT_ID(N'[Users]'))
        SET IDENTITY_INSERT [Users] ON;
    EXEC(N'INSERT INTO [Users] ([Id], [AiRecommendations], [DateOfRegister], [Degree], [Email], [Experience], [Password], [PhoneNumber], [PhotoUrl], [ProgrammingLanguagesKnown], [Role], [Skills], [Specialization], [Username])
    VALUES (1, N''Consider mentoring students in system design.'', ''2025-06-19T20:48:24.0000000'', N''M.Tech'', N''admin@example.com'', N''10 Years'', N''Admin@123'', N''9876543210'', N''admin-photo.jpg'', N''C#,Java'', N''Admin'', N''Leadership,Planning'', N''Software Engineering'', N''adminuser''),
    (2, N''Focus on DSA and backend frameworks.'', ''2025-06-19T20:48:24.0000000'', N''B.Tech'', N''john@example.com'', N''1 Year Internship'', N''Student@123'', N''9123456789'', N''john.jpg'', N''C++,Python'', N''Student'', N''C++,Java'', N''Computer Science'', N''johnstudent''),
    (3, N''Explore Kaggle challenges and GitHub projects.'', ''2025-06-19T20:48:24.0000000'', N''BCA'', N''ana@example.com'', N''6 Months Training'', N''Ana@321'', N''9988776655'', N''ana.jpg'', N''Python,JavaScript'', N''Student'', N''Python,ML'', N''AI'', N''anastudent''),
    (4, N''Participate in CTFs and security blogs.'', ''2025-06-19T20:48:24.0000000'', N''B.Sc'', N''rahul@example.com'', N''College Projects'', N''Rahul#456'', N''9001234567'', N''rahul.jpg'', N''Python,C'', N''Student'', N''Networking,Security'', N''Cybersecurity'', N''rahulstudent''),
    (5, N''Enhance React and Node.js skills.'', ''2025-06-19T20:48:24.0000000'', N''B.E'', N''divya@example.com'', N''Freelance projects'', N''Divya@789'', N''9876012345'', N''divya.jpg'', N''JavaScript,HTML,CSS'', N''Student'', N''Web Development'', N''Information Technology'', N''divyastudent'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AiRecommendations', N'DateOfRegister', N'Degree', N'Email', N'Experience', N'Password', N'PhoneNumber', N'PhotoUrl', N'ProgrammingLanguagesKnown', N'Role', N'Skills', N'Specialization', N'Username') AND [object_id] = OBJECT_ID(N'[Users]'))
        SET IDENTITY_INSERT [Users] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250620110240_test'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250620110240_test', N'9.0.6');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250621144403_null changes'
)
BEGIN
    DECLARE @var sysname;
    SELECT @var = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'Specialization');
    IF @var IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var + '];');
    ALTER TABLE [Users] ALTER COLUMN [Specialization] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250621144403_null changes'
)
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'PhoneNumber');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [Users] ALTER COLUMN [PhoneNumber] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250621144403_null changes'
)
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'Degree');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [Users] ALTER COLUMN [Degree] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250621144403_null changes'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250621144403_null changes', N'9.0.6');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    ALTER TABLE [Users] ADD [resume] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    ALTER TABLE [Users] ADD [streak] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    ALTER TABLE [HackathonsMaster] ADD [Badges] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    ALTER TABLE [HackathonsMaster] ADD [difficulty] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    ALTER TABLE [HackathonsMaster] ADD [skill] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    ALTER TABLE [Hackathons] ADD [Badge] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    CREATE TABLE [Summary] (
        [Id] int NOT NULL IDENTITY,
        [Username] nvarchar(max) NOT NULL,
        [userid] int NOT NULL,
        [Summary] nvarchar(max) NOT NULL,
        [Created] datetime2 NULL,
        CONSTRAINT [PK_Summary] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    CREATE TABLE [Teams] (
        [Id] int NOT NULL IDENTITY,
        [userid] int NOT NULL,
        [teamid] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Teams] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    CREATE TABLE [TeamsMaster] (
        [Id] int NOT NULL IDENTITY,
        [Teamname] nvarchar(max) NOT NULL,
        [CreatedBy] nvarchar(max) NOT NULL,
        [CreatedOn] datetime2 NOT NULL,
        [TeamMajor] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_TeamsMaster] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [resume] = NULL, [streak] = NULL
    WHERE [Id] = 1;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [resume] = NULL, [streak] = NULL
    WHERE [Id] = 2;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [resume] = NULL, [streak] = NULL
    WHERE [Id] = 3;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [resume] = NULL, [streak] = NULL
    WHERE [Id] = 4;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [resume] = NULL, [streak] = NULL
    WHERE [Id] = 5;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622084930_SD changes'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250622084930_SD changes', N'9.0.6');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622114957_SD changes2'
)
BEGIN
    ALTER TABLE [Users] ADD [Points] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622114957_SD changes2'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [Points] = NULL
    WHERE [Id] = 1;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622114957_SD changes2'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [Points] = NULL
    WHERE [Id] = 2;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622114957_SD changes2'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [Points] = NULL
    WHERE [Id] = 3;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622114957_SD changes2'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [Points] = NULL
    WHERE [Id] = 4;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622114957_SD changes2'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [Points] = NULL
    WHERE [Id] = 5;
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250622114957_SD changes2'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250622114957_SD changes2', N'9.0.6');
END;

COMMIT;
GO

